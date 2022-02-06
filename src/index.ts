import { program } from "commander"
import path from "path"
import map from "poly-map"
import { Event } from "./types"
import { readConfig } from "./config"
import { createEvent } from "./events"
import { Model } from "./model"

function run(configPath, command) {
  if (command.dev) {
    require("ts-node").register()
  }

  const config = readConfig(path.resolve(process.cwd(), configPath))

  const events = <Array<Event<any>>>Object.values(
    map(({ type, params, conditions }) => createEvent(type, params, conditions), config.events)
  )

  const runs = parseInt(command.runs)
  for (let i = 0; i < runs; i++) {
    const model = new Model(config.model, events)
    const startState = model.seed(config.seed)
    const endState = model.run(config.model.iterations, startState)
    console.log(endState.stats())
  }
}

program
  .version("0.0.0")
  .arguments("<config>")
  .description("run given model", {
    config: "path to the model configuration file, e.g. ./models/test/config.yaml"
  })
  .option("-r --runs <number>", "number of complete model runs", "1")
  .option("-d --dev", "development mode: typescript support", false)
  .action(run)
  .parse(process.argv)
