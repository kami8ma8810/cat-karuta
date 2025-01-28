export interface Card {
  id: string
  name: string
  imageUrl: string
  description: string
  isSelectable?: boolean
  isRevealed?: boolean
  isCorrect?: boolean
}