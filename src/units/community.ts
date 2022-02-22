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

  elapse(years: number) {
    let newborns = 0

    // Existing cohorts produce children age by the given number of years
    for (const cohort of this.cohorts) {
      newborns += cohort.procreate()
      cohort.elapse(years)
    }

    // New cohort is born
    this.cohorts.unshift(new Cohort({ population: newborns }))

    // The oldest cohort always dies
    this.cohorts.pop()
  }

  stats() {
    const stats = new Stats({ males: 0, females: 0 })
    for (const cohort of this.cohorts) {
      stats.plus(cohort.stats())
    }

    return stats
  }
}
