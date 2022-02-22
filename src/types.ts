export interface Range<T> {
  from: T
  to: T
}

export interface Rule<T> {
  affect(subject: T): void
}
