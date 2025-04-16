export type ClassConstructor<T = any, Y extends any[] = any[]> = new (
  ...args: Y
) => T
