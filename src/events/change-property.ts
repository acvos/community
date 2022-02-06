import { Condition, Event, Range } from "../types"
import { Person } from "../units/person"
import { randomNumber } from "../utils/random-value"

export class ChangeProperty implements Event<Person> {
  private property: string
  private value: number|Range<number>
  private operation: "increase"|"decrease"
  private conditions: Condition<Person>

  constructor({ property, value, operation }, conditions) {
    this.property = property
    this.value = value
    this.operation = operation
    this.conditions = conditions
  }

  affect(person: Person) {
    const result = { patch: {}, newUnits: [] }

    if (this.conditions.satisfied(person)) {
      const change = typeof this.value === "object"
        ? randomNumber(this.value["from"], this.value["to"])
        : this.value

      const sign = this.operation === "increase" ? 1 : -1

      result.patch[this.property] = sign * change
    }

    return result
  }
}
