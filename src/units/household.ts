import { v4 as uuidv4 } from "uuid"
import { Event, Stats } from "../types"
import { randomNumber } from "../utils/random-value"
import { Person } from "./person"

export class Household {
  name: string
  people: Array<Person>

  static create(config, options: { name?: string, size?: number } = {}) {
    const name = options.name || uuidv4()

    // We need minimum 2 people to form a household
    const size = options.size || 2

    const people = []
    for (let i = 1; i <= size; i++) {
      people.push(new Person({
        name: `${name}_${i}`,
        age: randomNumber(config.age.from, config.age.to)
      }))
    }

    return new Household({
      name,
      people
    })
  }

  constructor(config) {
    this.name = config.name
    this.people = (config.people || []).map(x => new Person(x))
  }

  step(events: Array<Event<any>>) {
    const people = this.people.map(x => x.step(events)).reduce((acc, next) => acc.concat(next), [])

    return new Household({
      name: this.name,
      people: people.filter(x => x.health > 0) // Remove dead people
    })
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