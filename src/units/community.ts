import { Stats } from "../utils/stats"
import { Cohort } from "./cohort"

interface HouseholdData {
  name: string
  numberOfHouseholds: number
  cohorts: Array<Cohort>
}

export class Community {
  name: string
  numberOfHouseholds: number
  cohorts: Array<Cohort>

  constructor({ name, numberOfHouseholds, cohorts }: HouseholdData) {
    this.name = name
    this.numberOfHouseholds = numberOfHouseholds
    this.cohorts = [...cohorts]
  }



  stats() {
    const stats = new Stats({ males: 0, females: 0 })
    for (const cohort of this.cohorts) {
      stats.plus(cohort.stats())
    }

    return stats
  }
}
