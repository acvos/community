import { Rule } from "./types"
import { compiler } from "./compiler"
import { UnitGenerator } from "./unit-generator"
import * as ruleTypes from "./rules"

function createRule(type, args, conditions = "true"): Rule<any> {
  const Klass = ruleTypes[type]
  if (!Klass) {
    throw new Error(`Unsupported rule type: ${type}`)
  }

  const condition = compiler.compile(conditions)

  return new Klass(args, x => condition.evalSync(x))
}

export class Model {
  private name: string
  private step: number
  private rules: Array<Rule<any>>
  private generator: UnitGenerator

  constructor(name, config) {
    this.name = name
    this.generator = new UnitGenerator(config.seed)
    this.step = config.seed.years_per_step
    this.rules = Object.values(config.rules)
      .map(({ type, conditions, ...params }) => createRule(type, params, conditions))
  }

  run(years: number, runs: number) {
    console.log(`Simulating ${this.name} ${runs} times...`)

    for (let run = 1; run <= runs; run++) {
      const community = this.generator.createCommunity(`${this.name}_${run}`, this.rules)
      for (let year = 0; year < years; year += this.step) {
        community.elapse(this.step)
      }

      console.log(`Run ${run}, Year ${years}`, community.stats())
    }
  }
}
