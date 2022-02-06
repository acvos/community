import { v4 as uuidv4 } from "uuid"
import { Event, Stats } from "../types"
import { randomNumber } from "../utils/random-value"
import { Person } from "./person"

export class Household {
  name: string
  people: Array<Person>

  static create(options, config: { name?: string, size?: number } = {}) {
    const name = options.name || uuidv4()

    // We need minimum 2 people to form a household
    const size = config.size || 2

    const people = []
    for (let i = 1; i <= size; i++) {
      const age = randomNumber(options.age.from, options.age.to)

      // Person grows until the age of 20 and begins to age at the age of 35
      const health = age > 0 ? Math.min(age, 20) * 6 - Math.max(age - 35, 0) * 2 : 1

      people.push(new Person({ name: `${name}_${i}`, age, health }))
    }

    return new Household({
      name,
      people
    })
  }

  constructor(data) {
    this.name = data.name
    this.people = (data.people || []).map(x => new Person(x))
  }

  step(events: Array<Event<any>>) {
    const people = this.people.flatMap(x => x.step(events))
    this.people = people.filter(x => x.health > 0) // Remove dead people

    return this
  }

  stats(): Stats {
    return this.people.reduce((acc, next) => {
      const nextStats = next.stats()

      return {
        population: acc.population + nextStats.population,
        females: acc.females + nextStats.females,
        males: acc.males + nextStats.males
      }
    }, {
      population: 0,
      females: 0,
      males: 0
    })
  }
}