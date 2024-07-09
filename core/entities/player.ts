import type PlayerInterface from "#core/entities/interfaces/player"
import type { Move, MoveHandler } from "#core/entities/interfaces/player"
import type { BoardGrid } from "#core/entities/interfaces/board"

export default class Player implements PlayerInterface {
  private readonly moveHandler: MoveHandler

  constructor(moveHandler: MoveHandler) {
    this.moveHandler = moveHandler
  }

  public getMove(boardGrid: BoardGrid): Move {
    return this.moveHandler(boardGrid)
  }
}
