import type PlayerInterface from "#core/entities/interfaces/player"
import type { Move, MoveHandler } from "#core/entities/interfaces/player"
import type { BoardGrid } from "#core/entities/interfaces/board"

export default class Player implements PlayerInterface {
  private readonly moveHandler: MoveHandler

  constructor(moveHandler: MoveHandler) {
    if (typeof moveHandler !== "function") {
      throw new TypeError("Move handler must be a function")
    }
    this.moveHandler = moveHandler
  }

  public getMove(boardGrid: BoardGrid): Move | never {
    const move = this.moveHandler(boardGrid)
    const { target, destination, cell } = move
    if (!target) {
      throw new TypeError("Target cell move cannot be 'undefined'")
    }
    if (typeof target.x !== "number" || typeof target.y !== "number") {
      throw new TypeError("Coordinates must be of type 'number'")
    }
    if (destination && (typeof destination.x !== "number" || typeof destination.y !== "number")) {
      throw new TypeError("Coordinates must be of type 'number'")
    }
    if (!["null", "undefined", "number"].includes(typeof cell)) {
      throw new TypeError("Cell must be of type 'number'")
    }
    return move
  }
}
