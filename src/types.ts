export type Instantiable<T = any> = new (...args: any[]) => T

export type Sex = "male"|"female"

export interface Range<T> {
  from: T
  to: T
}

export interface Condition<T> {
  satisfied(subject: T): boolean
}

export interface Event<T> {
  affect(subject: T): void
}
