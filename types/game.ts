export interface Card {
  id: string
  name: string
  imageUrl: string
  description: string
  isSelectable?: boolean
  isRevealed?: boolean
  isCorrect?: boolean
}

export interface GameState {
  status: 'waiting' | 'reading' | 'selecting' | 'showResult'
  playerScore: number
  computerScore: number
  level: number
  timeLimit: number  // コンピュータの待ち時間（レベルによって変動）
}

interface ComputerLevel {
  level: number;
  minWaitTime: number;    // 読み上げ開始からの最小待機時間
  maxWaitTime: number;    // 読み上げ終了からの最大待機時間
  interruptChance: number; // 読み上げ途中で回答する確率 (0-1)
}

const COMPUTER_LEVELS: ComputerLevel[] = [
  { level: 1, minWaitTime: 2000, maxWaitTime: 5000, interruptChance: 0 },    // 初級: 割り込みなし
  { level: 2, minWaitTime: 1500, maxWaitTime: 4000, interruptChance: 0 },    // 
  { level: 3, minWaitTime: 1000, maxWaitTime: 3000, interruptChance: 0.1 },  // たまに途中で回答
  { level: 4, minWaitTime: 800, maxWaitTime: 2500, interruptChance: 0.2 },   // 
  { level: 5, minWaitTime: 600, maxWaitTime: 2000, interruptChance: 0.3 },   // 中級: 30%の確率で途中回答
  { level: 6, minWaitTime: 500, maxWaitTime: 1500, interruptChance: 0.4 },   // 
  { level: 7, minWaitTime: 400, maxWaitTime: 1200, interruptChance: 0.5 },   // 上級: 50%の確率で途中回答
  { level: 8, minWaitTime: 300, maxWaitTime: 1000, interruptChance: 0.6 },   // 
  { level: 9, minWaitTime: 200, maxWaitTime: 800, interruptChance: 0.7 },    // 
  { level: 10, minWaitTime: 100, maxWaitTime: 500, interruptChance: 0.8 },   // 達人: 80%の確率で途中回答
]