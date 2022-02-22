import { program } from "commander"
import path from "path"
import { readConfig } from "./config"
import { Model } from "./model"

function run(configPath, command) {
  const config = readConfig(path.resolve(process.cwd(), configPath))
  const runs = parseInt(command.runs)
  const years = parseInt(command.years)

  const model = new Model(command.name, config)
  model.run(years, runs)
}

program
  .version("0.0.0")
  .argument("<config>", "path to the model configuration file, e.g. ./models/test/config.yaml")
  .option("-n --name <name>", "model name. Default: test", "test")
  .option("-r --runs <runs>", "number of model runs. Default: 1", "1")
  .option("-y --years <years>", "number of years to simulate for each model run. Default: 100", "100")
  .action(run)
  .parse(process.argv)
