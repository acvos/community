import { randomNumber } from "../utils/random-value"
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

  run(years: number) {
    for (const cohort of this.cohorts) {
      cohort.run(years)
    }

    // New cohort is born each step
    const fertility = 0.05
    const newborns = Math.round(fertility * this.stats().total)
    const male = randomNumber(0, newborns)
    const female = newborns - male
    this.cohorts.unshift(new Cohort({ male, female }))

    // The oldest cohort always dies each step
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
