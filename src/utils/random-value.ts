import { Range } from "../types"

export type Option<T> = {
  value: T
  weight?: number
}

export function randomNumber({ from, to }: Range<number>) {
  const range = to - from
  const raw = Math.random() * range
  const value = from + Math.round(raw)

  return value
}

export function randomOption<T>(...options: Array<Option<T>|T>) {
  const normalizeOption = (x: Option<T>|T) => ({
    value: "value" in x ? x.value : x,
    weight: "weight" in x ? x.weight : 1 // Default weight for each option is 1
  })

  const weightedValues = []
  for (const option of options) {
    const { weight, value } = normalizeOption(option)
    for (let i = 0; i < weight; i++) {
      weightedValues.push(value)
    }
  }

  const key = randomNumber({ from: 0, to: weightedValues.length - 1 })
  const value = weightedValues[key]

  return value
}
