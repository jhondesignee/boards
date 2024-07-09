import type { BoardGrid } from "#core/entities/interfaces/board"

export type MoveHandler = (boardGrid: BoardGrid) => Move

export type MoveValidator = (move: Move) => boolean

export interface coordinates {
  x: number
  y: number
}

export interface Move {
  target: coordinates
  destination?: coordinates
  cell?: number
}

export default interface PlayerInterface {
  getMove(boardGrid: BoardGrid): Move
}
