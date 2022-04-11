export interface PropConfig {
  configurable?: boolean;
  writable?: boolean;
  enumerable?: boolean;
}

export type ValidationError =
  | string
  | Error
  | Object
  | Record<string, any>
  | ((className: string, field: string) => string);
