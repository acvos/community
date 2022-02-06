import { Event } from "./types"
import { Community } from "./units/community"

interface ModelConfig {
  name: string
  iterations: number
}

export class Model {
  private name: string
  private events: Array<Event<any>>

  constructor(config: ModelConfig, events: Array<Event<any>>) {
    this.name = config.name
    this.events = events
  }

  seed(seedConfig) {
    return Community.create(seedConfig, { name: this.name })
  }

  run(years: number, initial: Community) {
    let next = initial

    for (let year = 1; year <= years; year++) {
      console.log(`Year ${year}`, next.stats())
      next = next.step(this.events)
    }

    return next
  }
}