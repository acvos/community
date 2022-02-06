import Expression from "jexl/Expression"
import { Condition } from "./types"
import { compiler } from "./compiler"

export class ScriptCondition<T> implements Condition<T> {
  private expression: Expression

  constructor(script: string) {
    this.expression = compiler.compile(script)
  }

  satisfied(context: T) {
    return this.expression.evalSync(context)
  }
}
