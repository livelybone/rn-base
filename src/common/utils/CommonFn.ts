// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(...args: any[]) {}

export function pendingPromise() {
  return new Promise(() => {})
}

export function timePromise(time: number) {
  return new Promise(res => setTimeout(res, time))
}
