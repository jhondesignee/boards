import type PlayerInterface from "#core/entities/interfaces/player"
import type BoardInterface from "#core/entities/interfaces/board"
import type { TicTacToeStatus } from "#core/game/tic-tac-toe"

export interface TicTacToeConfig {
  board: BoardInterface
  players: Array<PlayerInterface>
  firstPlayerIndex?: number
}

export interface TicTacToeState {
  board: BoardInterface
  players: Array<PlayerInterface>
  winner: PlayerInterface | null
  status: TicTacToeStatus
  currentPlayerIndex: number
}

export default interface TicTacToeInterface {
  nextTurn(): boolean
  get board(): BoardInterface
  get players(): Array<PlayerInterface>
  get gameStatus(): TicTacToeStatus
  get winner(): PlayerInterface | null
  get currentPlayer(): PlayerInterface
  checkForWinner(): PlayerInterface | null
  hasEnded(): boolean
}
