import { Event } from "../types"
import { ScriptCondition } from "../script-condition"
import { CreateUnit } from "./create-unit"
import { ChangeProperty } from "./change-property"

const eventTypes = {
  CreateUnit,
  ChangeProperty
}

export function createEvent(type, args, conditions): Event<any> {
  const Klass = eventTypes[type]
  if (!Klass) {
    throw new Error(`Unsupported event type: ${type}`)
  }

  return new Klass(args, new ScriptCondition(conditions))
}
