import { Range } from "../types"
import { randomNumber } from "./random-value"

export class ConfigurableValue {
  private config: Range<number>

  constructor(config: number|Range<number>) {
    this.config = typeof config === "number" ? { from: config, to: config } : config
  }

  getValue() {
    return randomNumber(this.config)
  }
}
