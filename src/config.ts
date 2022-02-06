import fs from "fs"
import path from "path"
import yaml from "yaml"
import format from "string-template"

export function readConfig(location) {
  const configLocation = path.resolve(process.cwd(), location)
  const configFile = fs.readFileSync(configLocation, "utf8")
  const withEnvVariables = format(configFile, process.env)
  const config = yaml.parse(withEnvVariables)

  return config
}
