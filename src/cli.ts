import { program } from "commander"
import path from "path"
import ObjectsToCsv  from "objects-to-csv"
import { readConfig } from "./config"
import { Model } from "./model"

async function run(configPath, command) {
  const config = readConfig(path.resolve(process.cwd(), configPath))
  const runs = parseInt(command.runs)
  const years = parseInt(command.years)

  const model = new Model(command.name, config)

  console.log(`Simulating ${model.name} ${runs} times...`)
  const history = model.run(years, runs)

  if (command.output) {
    const csv = new ObjectsToCsv(history)
    await csv.toDisk(command.output)
  }
}

program
  .version("0.0.0")
  .argument("<config>", "path to the model configuration file, e.g. ./models/test/config.yaml")
  .option("-n --name <name>", "model name. Default: test", "test")
  .option("-r --runs <runs>", "number of model runs. Default: 1", "1")
  .option("-y --years <years>", "number of years to simulate for each model run. Default: 100", "100")
  .option("-o --output <output>", "file to output model history into in CSV format.")
  .action(run)
  .parse(process.argv)
