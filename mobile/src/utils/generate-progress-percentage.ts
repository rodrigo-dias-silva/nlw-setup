export function genarateProgressPercentage(amount: number, completed: number) {
  return Math.round((completed / amount) * 100)
}