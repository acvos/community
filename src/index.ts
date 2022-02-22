import { program } from "commander"
import path from "path"
import map from "poly-map"
import { Event } from "./types"
import { readConfig } from "./config"
import { createEvent } from "./events"
import { UnitGenerator } from "./unit-generator"
import util from "util"

function run(configPath, command) {
  const config = readConfig(path.resolve(process.cwd(), configPath))

  // const events = <Array<Event<any>>>Object.values(
  //   map(({ type, params, conditions }) => createEvent(type, params, conditions), config.events)
  // )

  const name = command.name
  const runs = parseInt(command.runs)
  const years = parseInt(command.years)
  const model = new UnitGenerator(config.seed)
  const step = config.seed.years_per_step

  console.log(`Simulating ${name} ${runs} times...`)

  for (let run = 1; run <= runs; run++) {
    let community = model.createCommunity(`${name}_${run}`)
    for (let year = 0; year < years; year += step) {
      community.elapse(step)
      console.log(util.inspect(community, false, 1000, true))
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
