import jexl from "jexl"
import { randomOption } from "./utils/random-value"

jexl["addFunction"](
  "probability",
  (weight) => randomOption(
    { value: true, weight: weight * 100 },
    { value: false, weight: 100 - weight * 100 }
  )
)

export const compiler = jexl
