import type { Ref } from 'vue'
import type { GameState, GameStatus } from '@/types/game'
import { COMPUTER_LEVELS } from '@/types/computer'

interface UseComputerAnswerProps {
  gameState: Ref<GameState>
  updateScore: (type: 'player' | 'computer') => void
  updateStatus: (status: GameStatus) => void
}

export const useComputerAnswer = ({
  gameState,
  updateScore,
  updateStatus
}: UseComputerAnswerProps) => {
  // 途中で回答するタイマーとテキスト読み上げ後のタイマー
  let interruptTimerId: NodeJS.Timeout | undefined
  let answerTimerId: NodeJS.Timeout | undefined
  let onAnswerCallback: (() => void) | undefined

  const calculateWaitTimes = () => {
    const level = gameState.value.level
    const { minWaitTime, maxWaitTime, afterReadTime, interruptChance } = COMPUTER_LEVELS[level - 1]
    
    // 途中で回答する場合の待ち時間
    const interruptTime = Math.random() < interruptChance ? minWaitTime : null
    
    // テキスト読み上げ後の待ち時間
    const answerTime = afterReadTime

    return { interruptTime, answerTime, maxWaitTime }
  }

  const onComputerAnswer = (callback: () => void) => {
    onAnswerCallback = callback
  }

  const startAnswerTimer = (textLength: number) => {
    const { interruptTime, answerTime, maxWaitTime } = calculateWaitTimes()
    const level = gameState.value.level
    
    // タイマーをクリア
    cancelAnswerTimer()
    
    // 途中で回答するタイマー
    if (interruptTime) {
      interruptTimerId = setTimeout(() => {
        if (gameState.value.status === 'selecting') {
          // レベル3以下では途中回答でのみコンピュータの得点とする
          if (level > 3) {
            updateScore('computer')
          }
          updateStatus('showResult')
          onAnswerCallback?.()
        }
      }, interruptTime)
    }

    // テキスト読み上げ後の回答タイマー
    const readingTime = textLength * 100
    answerTimerId = setTimeout(() => {
      if (gameState.value.status === 'selecting') {
        // レベル3以下では時間切れでコンピュータの得点にしない
        if (level > 4) {
          updateScore('computer')
        }
        updateStatus('showResult')
        onAnswerCallback?.()
      }
    }, readingTime + maxWaitTime + answerTime)
  }

  const cancelAnswerTimer = () => {
    if (interruptTimerId) {
      clearTimeout(interruptTimerId)
      interruptTimerId = undefined
    }
    if (answerTimerId) {
      clearTimeout(answerTimerId)
      answerTimerId = undefined
    }
  }

  return {
    startAnswerTimer,
    cancelAnswerTimer,
    onComputerAnswer
  }
}