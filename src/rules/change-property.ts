import { Rule } from "../types"
import { Cohort } from "../units/cohort"
import { ConfigurableValue } from "../utils/configurable-value"

export class ChangeProperty implements Rule<Cohort> {
  private property: string
  private value: ConfigurableValue
  private condition: (cohort: Cohort) => boolean

  constructor({ property, value }, condition) {
    this.property = property
    this.value = new ConfigurableValue(value)
    this.condition = condition
  }

  affect(subject: Cohort) {
    if (this.condition(subject)) {
      subject[this.property] += this.value.getValue()
    }
  }
}
