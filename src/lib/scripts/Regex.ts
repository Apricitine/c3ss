//maybe use fuzzy finding algorithm


export default function stringSimilarity(a: string, b: string): number {
  if (a === b) return 100
  if (a.length === 0 || b.length === 0) return 0

  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1])
    }
  }

  const maxLen = Math.max(a.length, b.length)
  return Math.round((1 - matrix[b.length][a.length] / maxLen) * 100)
}