import { Rule } from "../types"
import { Stats } from "../utils/stats"
import { Cohort } from "./cohort"

interface HouseholdData {
  name: string
  numberOfHouseholds: number
  cohorts: Array<Cohort>
  rules: Array<Rule<any>>
}

export class Community {
  name: string
  numberOfHouseholds: number
  rules: Array<Rule<any>>
  cohorts: Array<Cohort>

  constructor({ name, numberOfHouseholds, cohorts, rules }: HouseholdData) {
    this.name = name
    this.numberOfHouseholds = numberOfHouseholds
    this.rules = [...rules]
    this.cohorts = [...cohorts]
  }

  private applyRules(cohort: Cohort) {
    for (const rule of this.rules) {
      rule.affect(cohort)
    }
  }

  elapse(years: number) {
    const newborns = new Cohort()

    // Existing cohorts are affected by the rules and events.
    // Then we account for the childbirth and population ageing.
    for (const cohort of this.cohorts) {
      this.applyRules(cohort)
      newborns.population += cohort.procreate()
      cohort.elapse(years)
    }

    // New cohort is born
    this.cohorts.unshift(newborns)

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
