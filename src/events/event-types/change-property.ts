import { Condition, Event } from "../../types"
import { Household } from "../../units/community"
import { ConfigurableValue } from "../../utils/configurable-value"

export class ChangeProperty implements Event<Household> {
  private property: string
  private value: ConfigurableValue<number>
  private conditions: Condition<Household>

  constructor({ property, value }, conditions) {
    this.property = property
    this.value = new ConfigurableValue<number>(value)
    this.conditions = conditions
  }

  affect(household: Household) {
    if (this.conditions.satisfied(household)) {
      const change = this.value.getValue()
      person[this.property] = person[this.property] + change
    }
  }
}
