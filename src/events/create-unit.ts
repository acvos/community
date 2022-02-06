import { Condition, Event, Range } from "../types"
import { Person } from "../units/person"
import { randomNumber } from "../utils/random-value"

const unitTypes = {
  Person
}

export class CreateUnit implements Event<Person> {
  private unit: string
  private quantity: number|Range<number>
  private conditions: Condition<Person>

  constructor({ unit, quantity }, conditions) {
    this.unit = unit
    this.quantity = quantity
    this.conditions = conditions
  }

  affect(person: Person) {
    const newUnits = []

    if (this.conditions.satisfied(person)) {
      const numberOfNewUnits = typeof this.quantity === "object"
        ? randomNumber(this.quantity["from"], this.quantity["to"])
        : this.quantity

      const Klass =  unitTypes[this.unit]
      for (let i = 1; i <= numberOfNewUnits; i++) {
        newUnits.push(new Klass({}))
      }
    }

    return { patch: {}, newUnits }
  }
}
