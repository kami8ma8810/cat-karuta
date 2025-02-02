export type GameStatus = 
  | 'waiting' 
  | 'reading' 
  | 'answering' 
  | 'selecting' 
  | 'showResult' 
  | 'timeupResult'  // 時間切れ結果表示
  | 'mistakeResult' // お手つき結果表示
  | 'waitingNext' 
  | 'gameCleared' 
  | 'gameOver' 
  | 'error'

// 正解表示の種類
export type RevealType = 'mistake' | 'timeup' | null

export interface GameScore {
  player: number
  computer: number
}

export interface GameState {
  status: GameStatus
  level: number
  score: GameScore
  timeLimit: number
}