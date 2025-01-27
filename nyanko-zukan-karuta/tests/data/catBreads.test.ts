import { describe, test, expect } from 'vitest'
import { catBreeds } from '@/assets/data/catBreeds'

describe('catBreeds', () => {
  test('必要なプロパティが存在する', () => {
    const breed = catBreeds['beng']  // for example
    expect(breed).toBeDefined()
    expect(breed).toHaveProperty('id')
    expect(breed).toHaveProperty('nameJa')
    expect(breed).toHaveProperty('descriptionJa')
  })

  test('すべての猫種にデータが正しく入力されている', () => {
    for (const [id, breed] of Object.entries(catBreeds)) {
      expect(breed.id).toBe(id)
      expect(breed.nameJa).toBeTruthy()
      expect(breed.descriptionJa).toBeTruthy()
    }
  })
})