import { Range } from "../types"
import { randomNumber } from "./random-value"

export class ConfigurableValue<T> {
  private config: T|Range<T>

  constructor(config: T|Range<T>) {
    this.config = config
  }

  getValue() {
    return typeof this.config === "object"
      ? randomNumber(this.config)
      : this.config
  }
}
