import { Range, Rule } from "./types"
import { randomNumber } from "./utils/random-value"
import { Cohort } from "./units/cohort"
import { Community } from "./units/community"

interface Seed {
  years_per_step: number
  male_to_female_ratio: number
  max_age: number
  households: {
    count: number
    size: Range<number>
    age: Range<number>
  }
}

export class UnitGenerator {
  private seed: Seed

  constructor(seed: Seed) {
    this.seed = seed
  }

  private seedCohorts() {
    const cohorts = []
    for (let age = 0; age < this.seed.max_age; age += this.seed.years_per_step) {
      cohorts.push(new Cohort({ age, maleRatio: this.seed.male_to_female_ratio }))
    }

    return cohorts
  }

  createCommunity(name: string, rules: Array<Rule<any>>) {
    const cohorts = this.seedCohorts()

    // Seed each household independently, add results to the community profile
    const numberOfHouseholds = this.seed.households.count
    for (let i = 1; i <= numberOfHouseholds; i++) {
      const size = randomNumber(this.seed.households.size)

      for (let i = 1; i <= size; i++) {
        const age = randomNumber(this.seed.households.age)
        const cohortKey = Math.round(age/this.seed.years_per_step)
        cohorts[cohortKey].population++
      }
    }

    return new Community({ name, cohorts, numberOfHouseholds, rules })
  }
}
