import { Stats } from "../utils/stats"

export class Cohort {
  age: number
  population: number
  maleRatio: number
  fertility: number
  health: number

  constructor(config: Partial<Cohort> = {}) {
    this.age = config.age || 0
    this.population = config.population || 0
    this.maleRatio = config.maleRatio || 1
    this.fertility = config.fertility || 0 // Positive number: children per women per step
    this.health = config.health || 75      // Positive number between 1 and 100: opposite to mortality
  }
  // const next = i + this.seed.years_per_step
  // const name = next > this.seed.max_age ? `greater_than_${i}` : `${i} to ${next}`

  get males() {
    return Math.round(this.population * this.maleRatio / (1 + this.maleRatio))
  }

  get females() {
    return this.population - this.males
  }

  procreate() {
    return Math.round(this.fertility * this.females)
  }

  elapse(years: number) {
    this.age += years

    const mortality = (100 - this.health) / 100
    const deaths = Math.ceil(this.population * mortality)
    this.population = this.population - deaths

    if (this.age >= 15 && this.age <= 30) {
      this.fertility = 4
    } else {
      this.fertility = 0
    }
  }

  stats() {
    return new Stats({
      males: this.males,
      females: this.females
    })
  }
}