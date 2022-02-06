export function times(n: number, func: Function) {
  const results = []
  for (let i = 1; i <= n; i++) {
    results.push(func(i))
  }

  return results
}