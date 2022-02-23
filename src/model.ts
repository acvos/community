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
  name: string
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
    const history = []
    for (let run = 1; run <= runs; run++) {
      const community = this.generator.createCommunity(`${this.name}_${run}`, this.rules)
      const historyLine = {}
      for (let year = 0; year < years; year += this.step) {
        historyLine[`year_${year}`] = community.stats().total
        community.elapse(this.step)
      }

      history.push(historyLine)
      console.log(`Run ${run}, Year ${years}`, community.stats())
    }

    return history
  }
}
