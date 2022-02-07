import { Event, Stats } from "../types"
import { Person } from "./person"

export class Household {
  name: string
  people: Array<Person>

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