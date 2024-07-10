// @ts-nocheck
import { describe, test, expect } from "vitest"
import Player from "#core/entities/player"

describe("Player test", () => {
  test("Move handler should be a function", () => {
    expect(() => new Player(0)).toThrowError()
    expect(() => new Player("foo")).toThrowError()
    expect(() => new Player(() => {})).not.toThrowError()
  })
  test("Invalid move object from move handler should throw an error", () => {
    const moveTest = {
      validMoves: [
        { target: { x: 0, y: 0 } },
        { target: { x: 0, y: 0 }, destination: { x: 0, y: 0 } },
        { target: { x: 0, y: 0 }, destination: { x: 0, y: 0 }, cell: 0 }
      ],
      invalidMoves: [
        {},
        { destination: { x: 0, y: 0 } },
        { target: { x: "foo", y: "bar" } },
        { target: { x: 0, y: 0 }, destination: { x: "foo", y: "bar" } },
        { target: { x: 0, y: 0 }, cell: "foo" }
      ]
    }
    for (let validMove of moveTest.validMoves) {
      expect(() => new Player(() => validMove).getMove()).not.toThrowError()
    }
    for (let invalidMove of moveTest.invalidMoves) {
      expect(() => new Player(() => invalidMove).getMove()).toThrowError()
    }
  })
})
