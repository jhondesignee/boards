export type BoardGrid = Array<Array<number>>

export default interface BoardInterface {
  getCell(rowIndex: number, cellIndex: number): number | never
  setCell(rowIndex: number, cellIndex: number, cell: number): void | never
  getGrid(): BoardGrid
  setGrid(grid: BoardGrid): void | never
  isCellEmpty(rowIndex: number, cellIndex: number): boolean
  isFull(): boolean
}
