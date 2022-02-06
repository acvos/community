import { v4 as uuidv4 } from "uuid"
import { Event, Stats } from "../types"
import { randomNumber } from "../utils/random-value"
import { Household } from "./household"

export class Community {
  name: string
  households: Array<Household>

  static create(seedConfig, options: { name?: string } = {}) {
    const name = options.name || uuidv4()

    const households = []
    for (let i = 1; i <= seedConfig.households; i++) {
      households.push(Household.create(seedConfig, {
        name: `${name}_${i}`,
        size: randomNumber(seedConfig.household_size.from, seedConfig.household_size.to)
      }))
    }

    return new Community({
      name,
      households
    })
  }

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
