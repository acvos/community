import map from "poly-map"
import { Condition, Event, Instantiable } from "../../types"
import { times } from "../../utils/times"
import { ConfigurableValue } from "../configurable-value"
import { Person } from "../../units/person"

const unitTypes = {
  Person
}

export class CreateUnit implements Event<Person> {
  private unitClass: Instantiable<any>
  private quantity: ConfigurableValue<number>
  private conditions: Condition<Person>
  private template: {[property: string]: ConfigurableValue<any>}

  constructor({ unit, quantity, template }, conditions) {
    this.unitClass = unitTypes[unit]
    this.quantity = new ConfigurableValue<number>(quantity)
    this.template = map(x => new ConfigurableValue<any>(x), template)
    this.conditions = conditions
  }

  affect(person: Person) {
    const units = this.conditions.satisfied(person)
      ? times(
          this.quantity.getValue(),
          () => new this.unitClass(map(x => x.getValue(), this.template))
        )
      : []

    return { units }
  }
}
