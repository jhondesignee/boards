// @ts-nocheck
import { describe, test, expect } from "vitest"
import Board from "#core/entities/board"

const testCases = [{ size: 1 }, { size: 3 }, { size: 10 }]

describe("Board test", () => {
  test("Grid size should be greater than zero", () => {
    expect(() => new Board(-1)).toThrowError()
    expect(() => new Board(0)).toThrowError()
    expect(() => new Board(1)).not.toThrowError()
  })
  test("Grid should be filled in to be set", () => {
    const board = new Board()
    expect(() => board.setGrid([])).toThrowError()
    expect(() => board.setGrid([[]])).toThrowError()
    expect(() => board.setGrid([[], []])).toThrowError()
    expect(() => board.setGrid([[], [0]])).toThrowError()
    expect(() => board.setGrid([[0], []])).toThrowError()
    expect(() =>
      board.setGrid([
        [0, 0],
        [0, 0]
      ])
    ).not.toThrowError()
  })
  test("Grid rows should be an array and grid cells should be a number", () => {
    const board = new Board()
    expect(() => board.setGrid([0])).toThrowError()
    expect(() => board.setGrid([[[0]]])).toThrowError()
    expect(() => board.setGrid([[0]])).not.toThrowError()
  })
  test("Grid rows count should not differ from cells count", () => {
    const board = new Board()
    const validGrid = [
      [0, 0],
      [0, 0]
    ]
    const invalidGrid = [
      [0, 0],
      [0, 0, 0]
    ]
    expect(() => board.setGrid(validGrid)).not.toThrowError()
    expect(() => board.setGrid(invalidGrid)).toThrowError()
  })
  test("Grid should be full if it has no more zero cells", () => {
    const board = new Board()
    const partiallyFullGrid = [
      [1, 0],
      [0, 2]
    ]
    const fullGrid = [
      [1, 2],
      [-1, 1]
    ]
    board.setGrid(partiallyFullGrid)
    expect(board.isFull()).toBeFalsy()
    board.setGrid(fullGrid)
    expect(board.isFull()).toBeTruthy()
  })
  describe.each(testCases)("$size x $size board test", ({ size }) => {
    test(`Grid should be ${size} x ${size}`, () => {
      const board = new Board(size)
      const grid = board.getGrid()
      expect(grid.length).toBe(size)
      for (let row of grid) {
        expect(row.length).toBe(size)
      }
    })
    test("Get cell out of range should throw an error", () => {
      const board = new Board(size)
      expect(() => board.getCell(0, 0)).not.toThrowError()
      expect(() => board.getCell(size - 1, size - 1)).not.toThrowError()
      expect(() => board.getCell(-1, 0)).toThrowError()
      expect(() => board.getCell(0, -1)).toThrowError()
      expect(() => board.getCell(-1, -1)).toThrowError()
      expect(() => board.getCell(size, size)).toThrowError()
      expect(() => board.isCellEmpty(0, 0)).not.toThrowError()
      expect(() => board.isCellEmpty(size - 1, size - 1)).not.toThrowError()
      expect(() => board.isCellEmpty(-1, 0)).toThrowError()
      expect(() => board.isCellEmpty(0, -1)).toThrowError()
      expect(() => board.isCellEmpty(-1, -1)).toThrowError()
      expect(() => board.isCellEmpty(size, size)).toThrowError()
    })
    test("Set cell out of range should throw an error", () => {
      const board = new Board(size)
      const cell = 1
      expect(() => board.setCell(0, 0, cell)).not.toThrowError()
      expect(() => board.setCell(size - 1, size - 1, cell)).not.toThrowError()
      expect(() => board.setCell(-1, 0, cell)).toThrowError()
      expect(() => board.setCell(0, -1, cell)).toThrowError()
      expect(() => board.setCell(-1, -1, cell)).toThrowError()
      expect(() => board.setCell(size, size, cell)).toThrowError()
    })
    test("Cell should be set", () => {
      const board = new Board(size)
      const cell = 1
      board.setCell(0, 0, cell)
      board.setCell(size - 1, size - 1, cell)
      expect(board.getCell(0, 0)).toBe(cell)
      if (size > 1) {
        expect(board.getCell(size - 1, 0)).not.toBe(cell)
      }
      expect(board.getCell(size - 1, size - 1)).toBe(cell)
    })
  })
})
