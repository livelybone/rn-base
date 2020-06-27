declare interface Global {
  HermesInternal: any
}

declare const global: Global

declare module '*.png'
declare module '*.jpeg'

declare type V_FnV<V, Args extends any[] = [any]> = V | ((...args: Args) => V)

declare type PromiseVal<T extends Promise<any>> = T extends Promise<infer E>
  ? E
  : unknown
