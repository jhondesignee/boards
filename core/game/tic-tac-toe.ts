import type TicTacToeInterface from "#core/game/interfaces/tic-tac-toe"
import type { TicTacToeConfig, TicTacToeState } from "#core/game/interfaces/tic-tac-toe"
import type PlayerInterface from "#core/entities/interfaces/player"
import type { Move } from "#core/entities/interfaces/player"
import type BoardInterface from "#core/entities/interfaces/board"

export enum TicTacToeStatus {
  ONGOING = 0,
  TIE = 1,
  WINNER = 2
}

export default class TicTacToe implements TicTacToeInterface {
  private readonly state: TicTacToeState

  constructor(config: TicTacToeConfig) {
    if (!config.players.length) throw new RangeError("'config.players' cannot be empty")
    this.state = {
      board: config.board,
      players: config.players,
      winner: null,
      status: TicTacToeStatus.ONGOING,
      currentPlayerIndex: 0
    }
  }

  public nextTurn(): boolean {
    if (this.hasEnded()) return false
    const move = this.currentPlayer.getMove(this.board.getGrid())
    this.doMove(move)
    const winner = this.checkForWinner()
    if (winner) {
      this.status = TicTacToeStatus.WINNER
    } else if (this.board.isFull()) {
      this.status = TicTacToeStatus.TIE
    }
    this.status = TicTacToeStatus.ONGOING
    if (!this.hasEnded()) this.switchPlayer()
    return true
  }

  public get players(): Array<PlayerInterface> {
    return this.state.players
  }

  public get board(): BoardInterface {
    return this.state.board
  }

  public get gameStatus(): TicTacToeStatus {
    return this.state.status
  }

  public get winner(): PlayerInterface | null {
    if (this.gameStatus === TicTacToeStatus.WINNER) {
      return this.currentPlayer
    } else return null
  }

  public get currentPlayer(): PlayerInterface {
    return this.players[this.currentPlayerIndex] as PlayerInterface
  }

  public checkForWinner(): PlayerInterface | null {
    const boardGrid = this.board.getGrid()
    const size = boardGrid.length
    const diagonals: [Array<number>, Array<number>] = [[], []]
    for (let [rowIndex, row] of boardGrid.entries()) {
      if (this.allCellsEqual(row)) {
        return this.currentPlayer
      }
      const column = boardGrid.map(row => row[rowIndex]) as Array<number>
      if (this.allCellsEqual(column)) {
        return this.currentPlayer
      }
    }
    diagonals[0] = boardGrid.map((row, index) => row[index]) as Array<number>
    diagonals[1] = boardGrid.map((row, index) => row[size - 1 - index]) as Array<number>
    for (let diagonal of diagonals) {
      if (this.allCellsEqual(diagonal)) {
        return this.currentPlayer
      }
    }
    return null
  }

  public hasEnded(): boolean {
    return this.gameStatus !== TicTacToeStatus.ONGOING
  }

  private get currentPlayerIndex(): number {
    return this.state.currentPlayerIndex
  }

  private set currentPlayerIndex(playerIndex: number) {
    this.state.currentPlayerIndex = playerIndex
  }

  private set status(status: TicTacToeStatus) {
    this.state.status = status
  }

  private doMove({ target, cell }: Move): void {
    if (!cell) return
    this.board.setCell(target.y, target.x, cell)
  }

  private switchPlayer(): void {
    const newPlayerIndex = this.currentPlayerIndex + 1
    this.currentPlayerIndex = newPlayerIndex < this.players.length ? newPlayerIndex : 0
  }

  private allCellsEqual(array: Array<number>): boolean {
    return array.every(item => item === array[0])
  }
}
