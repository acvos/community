import { program } from "commander"
import path from "path"
import { Rule } from "./types"
import { readConfig } from "./config"
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

function run(configPath, command) {
  const config = readConfig(path.resolve(process.cwd(), configPath))

  const rules = Object.values(config.rules)
    .map(({ type, conditions, ...params }) => createRule(type, params, conditions))

  const name = command.name
  const runs = parseInt(command.runs)
  const years = parseInt(command.years)
  const model = new UnitGenerator(config.seed)
  const step = config.seed.years_per_step

  console.log(`Simulating ${name} ${runs} times...`)

  for (let run = 1; run <= runs; run++) {
    const community = model.createCommunity(`${name}_${run}`, rules)
    for (let year = 0; year < years; year += step) {
      community.elapse(step)
    }

    console.log(`Run ${run}, Year ${years}`, community.stats())
  }
}

program
  .version("0.0.0")
  .argument("<config>", "path to the model configuration file, e.g. ./models/test/config.yaml")
  .option("-n --name <name>", "model name. Default: test", "test")
  .option("-r --runs <runs>", "number of model runs. Default: 1", "1")
  .option("-y --years <years>", "number of years to simulate for each model run. Default: 100", "100")
  .action(run)
  .parse(process.argv)
