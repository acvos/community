import { Event } from "../types"
import { ScriptCondition } from "./script-condition"
import { CreateUnit } from "./event-types/create-unit"
import { ChangeProperty } from "./event-types/change-property"
import { NegativeExperience } from "./event-types/negative-experience"

const eventTypes = {
  CreateUnit,
  ChangeProperty,
  NegativeExperience
}

export function createEvent(type, args, conditions): Event<any> {
  const Klass = eventTypes[type]
  if (!Klass) {
    throw new Error(`Unsupported event type: ${type}`)
  }

  return new Klass(args, new ScriptCondition(conditions))
}
