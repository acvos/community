export interface Stats {
  population: number
  males: number
  females: number
}

export interface Range<T> {
  from: T
  to: T
}

export interface Condition<T> {
  satisfied(subject: T): boolean
}

export interface EventResult<T> {
  patch: Partial<T>
  newUnits: Array<any>
}

export interface Event<T> {
  affect(subject: T): EventResult<T>
}
