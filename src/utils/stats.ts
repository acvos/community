export class Stats {
  total: number
  males: number
  females: number

  constructor({ males, females }) {
    this.males = males
    this.females = females
    this.total = this.males + this.females
  }

  plus(stats: Stats) {
    this.males += stats.males
    this.females += stats.females
    this.total = this.males + this.females
  }
}
