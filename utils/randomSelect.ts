export const selectRandom = <T>(items: T[], count: number): T[] => {
  const copied = [...items]
  
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32) * (i + 1))
    ;[copied[i], copied[j]] = [copied[j], copied[i]]
  }
  
  return copied.slice(0, count)
}