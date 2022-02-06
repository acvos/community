import { v4 as uuidv4 } from "uuid"
import { Event, Stats } from "../types"
import { randomOption } from "../utils/random-value"

export type Sex = "male"|"female"

export class Person {
  name: string
  sex: Sex
  age: number
  health: number

  constructor(config: Partial<Person> = {}) {
    this.name = config.name || uuidv4()
    this.sex = config.sex || randomOption(
      { value: "male", weight: 1 },
      { value: "female", weight: 1 }
    )
    this.age = config.age || 0
    this.health = config.health || 0
  }

  step(events: Array<Event<Person>>) {
    this.age++

    const results = [this]
    for (const event of events) {
      const { units } = event.affect(this)
      units.forEach(x => results.push(x))
    }

    return results
  }

  stats(): Stats {
    return {
      population: 1,
      females: this.sex === "female" ? 1 : 0,
      males: this.sex === "male" ? 1 : 0
    }
  }
}