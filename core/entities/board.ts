import type BoardInterface from "#core/entities/interfaces/board"
import type { BoardGrid } from "#core/entities/interfaces/board"

export default class Board implements BoardInterface {
  static readonly EMPTY_CELL = 0
  private grid: BoardGrid

  constructor(size: number) {
    if (size <= 0) {
      throw new RangeError("Grid size cannot be less than or equal to zero")
    }
    this.grid = this.createBoard(size)
  }

  public getGrid(): BoardGrid {
    return this.grid
  }

  public setGrid(grid: BoardGrid): void | never {
    if (grid.length === 0) {
      throw new RangeError("Grid rows must not be empty")
    }
    const cellCount = grid[0]?.length
    for (let row of grid) {
      if (!Array.isArray(row)) {
        throw new TypeError("Grid rows must be of type 'Array'")
      }
      if (row.length === 0) {
        throw new RangeError("Grid rows must be filled")
      }
      for (let cell of row) {
        if (typeof cell !== "number") {
          throw new TypeError("Grid cells must be of type 'number'")
        }
      }
      if (row.length !== cellCount) {
        throw new RangeError("Grid rows and cells count must have the same length")
      }
    }
    this.grid = grid
  }

  public getCell(rowIndex: number, cellIndex: number): number | never {
    if (this.grid[rowIndex]?.[cellIndex] === undefined) {
      throw new RangeError("Invalid cell range")
    }
    return this.grid[rowIndex][cellIndex]
  }

  public setCell(rowIndex: number, cellIndex: number, cell: number): void | never {
    if (this.grid[rowIndex]?.[cellIndex] === undefined) {
      throw new RangeError("Invalid cell range")
    }
    this.grid[rowIndex][cellIndex] = cell
  }

  public isCellEmpty(rowIndex: number, cellIndex: number): boolean {
    if (this.grid[rowIndex]?.[cellIndex] === undefined) {
      throw new RangeError("Invalid cell range")
    }
    return this.getCell(rowIndex, cellIndex) === Board.EMPTY_CELL
  }

  public isFull(): boolean {
    for (let row of this.getGrid()) {
      for (let cell of row) {
        if (cell === Board.EMPTY_CELL) return false
      }
    }
    return true
  }

  private createBoard(size: number): BoardGrid {
    return Array.from({ length: size }, () => {
      return Array.from({ length: size }, () => Board.EMPTY_CELL)
    })
  }
}
