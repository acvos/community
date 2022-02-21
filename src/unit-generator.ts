import { v4 as uuidv4 } from "uuid"
import { Range } from "./types"
import { Cohort } from "./units/cohort"
import { Community } from "./units/community"
import { randomNumber, randomOption } from "./utils/random-value"

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
      cohorts.push(new Cohort({ age }))
    }

    return cohorts
  }

  private generatePerson() {
    const age = randomNumber(this.seed.households.age.from, this.seed.households.age.to)
    const sex = randomOption(
      { value: "male", weight: this.seed.male_to_female_ratio },
      { value: "female", weight: 1 }
    )

    return { age, sex }
  }

  createCommunity(name: string = uuidv4()) {
    const cohorts = this.seedCohorts()

    // Seed each household independently, add results to the community profile
    const numberOfHouseholds = this.seed.households.count
    for (let i = 1; i <= numberOfHouseholds; i++) {
      const size = randomNumber(this.seed.households.size.from, this.seed.households.size.to)

      for (let i = 1; i <= size; i++) {
        const { age, sex } = this.generatePerson()
        const cohortKey = Math.round(age/this.seed.years_per_step)
        cohorts[cohortKey][sex]++
      }
    }

    return new Community({ name, cohorts, numberOfHouseholds })
  }
}
