import { Event, Stats } from "../types"
import { Household } from "./household"

export class Community {
  name: string
  households: Array<Household>

  constructor(config) {
    this.name = config.name
    this.households = (config.households || []).map(x => new Household(x))
  }

  step(events: Array<Event<any>>) {
    return new Community({
      name: this.name,
      households: this.households.map(x => x.step(events))
    })
  }

  stats(): Stats {
    return this.households.reduce((acc, next) => {
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
