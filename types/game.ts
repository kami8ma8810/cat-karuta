export type GameStatus = 'waiting' | 'reading' | 'answering' | 'selecting' | 'showResult'

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