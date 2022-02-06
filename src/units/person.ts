import { v4 as uuidv4 } from "uuid"
import { Event, Stats } from "../types"
import { randomOption } from "../utils/random-value"

export type Sex = "male"|"female"

export class Person {
  name: string
  sex: Sex
  age: number
  health: number

  constructor(config) {
    this.name = config.name || uuidv4()

    this.sex = config.sex || randomOption(
      { value: "male", weight: 1 },
      { value: "female", weight: 1 }
    )

    this.age = config.age || 0

    this.health = config.health
      // Person grows until the age of 15 and then begins to age
      || this.age > 0
        ? Math.min(this.age, 15) * 6 - Math.max(this.age - 15, 0) * 2
        : 1
  }

  step(events: Array<Event<Person>>) {
    const results = []
    const nextVersion = new Person({
      name: this.name,
      sex: this.sex,
      age: this.age + 1,
      health: this.health
    })

    for (const event of events) {
      const { patch, newUnits } = event.affect(this)

      nextVersion.health += patch.health || 0
      newUnits.forEach(x => results.push(x))
    }

    results.push(nextVersion)

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