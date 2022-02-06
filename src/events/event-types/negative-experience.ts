import { Condition, Event } from "../../types"
import { Person } from "../../units/person"
import { ConfigurableValue } from "../configurable-value"

export class NegativeExperience implements Event<Person> {
  private property: string
  private value: ConfigurableValue<number>
  private conditions: Condition<Person>

  constructor({ property, value }, conditions) {
    this.property = property
    this.value = new ConfigurableValue<number>(value)
    this.conditions = conditions
  }

  affect(person: Person) {
    if (this.conditions.satisfied(person)) {
      const change = person.experience - this.value.getValue()
      const normalizedChange = change > 0 ? change : 0
      person[this.property] = person[this.property] - normalizedChange
      person.experience++
    }

    return { units: [] }
  }
}
