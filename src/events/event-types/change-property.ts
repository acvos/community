import { Condition, Event } from "../../types"
import { Person } from "../../units/person"
import { ConfigurableValue } from "../configurable-value"

export class ChangeProperty implements Event<Person> {
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
      const change = this.value.getValue()
      person[this.property] = person[this.property] + change
    }

    return { units: [] }
  }
}
