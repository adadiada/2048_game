/* eslint-disable padding-line-between-statements */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
"use strict";

class Game {
  constructor(initialState) {
    const emptyBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
    const startBoard = initialState || emptyBoard;
    this.initialState = startBoard.map((row) => [...row]);
    this.score = 0;
    this.status = "idle";
    this.board = this.initialState;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board.map((row) => [...row]);
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
    this.status = "playing";
  }

  restart() {
    this.board = this.initialState.map((row) => [...row]);
    this.score = 0;
    this.status = "idle";
  }

  isGameWon() {
    return this.board.flat().includes(2048);
  }

  isGameLost() {
    return !this.hasMoves();
  }

  processLine(line) {
    const tiles = line.filter((tile) => tile !== 0);

    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] === tiles[i + 1]) {
        tiles[i] *= 2;
        this.score += tiles[i];
        tiles.splice(i + 1, 1);
      }
    }

    while (tiles.length < line.length) {
      tiles.push(0);
    }

    return tiles;
  }

  hasMoves() {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board.length; c++) {
        if (this.board[r][c] === 0) {
          return true;
        }
        if (c < 3 && this.board[r][c] === this.board[r][c + 1]) {
          return true;
        }
        if (r < 3 && this.board[r][c] === this.board[r + 1][c]) {
          return true;
        }
      }
    }
    return false;
  }

  updateStatus() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.board[r][c] === 2048) {
          this.status = "win";
          return;
        }
      }
    }
    if (this.hasMoves()) {
      this.status = "playing";
    } else {
      this.status = "lose";
    }
  }

  moveLeft() {
    if (this.status !== "playing") {
      return;
    }
    const previousState = this.getState();
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = this.processLine(this.board[i]);
    }
    const changed =
      JSON.stringify(previousState) !== JSON.stringify(this.board);
    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  moveRight() {
    if (this.status !== "playing") {
      return;
    }
    const previousState = this.getState();
    for (let i = 0; i < this.board.length; i++) {
      const originalRow = [...this.board[i]].reverse();
      const newRow = this.processLine(originalRow);

      this.board[i] = newRow.reverse();
    }
    const changed =
      JSON.stringify(previousState) !== JSON.stringify(this.board);
    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }
  moveUp() {
    if (this.status !== "playing") {
      return;
    }
    const previousState = this.getState();
    for (let c = 0; c < this.board.length; c++) {
      const column = this.board.map((row) => row[c]);
      const newColumn = this.processLine(column);

      for (let r = 0; r < this.board.length; r++) {
        this.board[r][c] = newColumn[r];
      }
    }
    const changed =
      JSON.stringify(previousState) !== JSON.stringify(this.board);
    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }
  moveDown() {
    if (this.status !== "playing") {
      return;
    }
    const previousState = this.getState();
    for (let c = 0; c < this.board.length; c++) {
      const column = this.board.map((row) => row[c]);
      const newColumn = this.processLine(column.reverse()).reverse();

      for (let r = 0; r < this.board.length; r++) {
        this.board[r][c] = newColumn[r];
      }
    }
    const changed =
      JSON.stringify(previousState) !== JSON.stringify(this.board);
    if (changed) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  addRandomTile() {
    const emptyCells = [];

    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board.length; c++) {
        if (this.board[r][c] === 0) {
          emptyCells.push([r, c]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

      this.board[r][c] = Math.random() < 0.1 ? 4 : 2;
    }
  }
}

export default Game;
