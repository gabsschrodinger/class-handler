export interface PropConfig {
  configurable?: boolean
  writable?: boolean
  enumerable?: boolean
}

export type ValidationError =
  | string
  | Error
  | Object
  | Record<string, any>
  | ((className: string, field: string) => string)

export interface Constructable<T> {
  new (...args: any): T
}

export type Condition = (value: unknown) => boolean
