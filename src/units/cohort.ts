import { Stats } from "../utils/stats"

export class Cohort {
  age: number
  male: number
  female: number

  constructor(config: Partial<Cohort> = {}) {
    this.age = config.age || 0
    this.male = config.male || 0
    this.female = config.female || 0
  }
  // const next = i + this.seed.years_per_step
  // const name = next > this.seed.max_age ? `greater_than_${i}` : `${i} to ${next}`

  run(years: number) {
    this.age += years
  }

  stats() {
    return new Stats({
      females: this.female,
      males: this.male
    })
  }
}