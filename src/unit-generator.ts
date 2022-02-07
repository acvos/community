import { v4 as uuidv4 } from "uuid"
import { Range } from "./types"
import { randomNumber, randomOption } from "./utils/random-value"
import { Household } from "./units/household"
import { Community } from "./units/community"
import { Person } from "./units/person"

interface Seed {
  households: number
  household_size: Range<number>
  age: Range<number>
  male_to_female_ratio: number
}

export class UnitGenerator {
  private seed: Seed

  constructor(seed: Seed) {
    this.seed = seed
  }

  createHousehold({ name, size } = { name: uuidv4(), size: 2 }) {
    const people = []
    for (let i = 1; i <= size; i++) {
      const age = randomNumber(this.seed.age.from, this.seed.age.to)
      const sex = randomOption(
        { value: "male", weight: this.seed.male_to_female_ratio },
        { value: "female", weight: 1 }
      )
      // Person grows until the age of 20 and then begins to age
      const health = age > 0 ? Math.min(age, 20) * 6 - Math.max(age - 20, 0) * 2 : 1

      people.push(new Person({ name: `${name}_${i}`, age, health, sex }))
    }

    return new Household({ name, people })
  }

  createCommunity(name: string = uuidv4()) {
    const households = []
    for (let i = 1; i <= this.seed.households; i++) {
      households.push(this.createHousehold({
        name: `${name}_${i}`,
        size: randomNumber(this.seed.household_size.from, this.seed.household_size.to)
      }))
    }

    return new Community({ name, households })
  }
}
