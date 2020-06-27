export function promisefy(fn: (...args: any[]) => void) {
  return (...$args: any[]) =>
    new Promise(res => {
      fn(...$args, res)
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(...args: any[]) {}

export function pendingPromise() {
  return new Promise(() => {})
}
