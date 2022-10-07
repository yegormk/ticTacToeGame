import { Component, OnInit } from '@angular/core';

import { nicknames } from '../Interfaces/players.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  listOfInfoPlayers!: nicknames;

  constructor() {}

  ngOnInit(): void {
    this.listOfInfoPlayers = {
      firstPlayer: '',
      secondPlayer: '',
      firstScore: 0,
      secondScore: 0,
      squares: [],
      xIsNext: true,
      counter: 0,
      lastWinner: '',
      freshPage: true,
    };
  }

  newGame(action: string): void {
    action === 'Continue' ? (this.listOfInfoPlayers.freshPage = false) : (this.listOfInfoPlayers.freshPage = true);
    this.listOfInfoPlayers.squares = Array(9).fill('');
    this.listOfInfoPlayers.lastWinner = '';
    this.listOfInfoPlayers.counter = 0;
  }

  get player() {
    return this.listOfInfoPlayers.xIsNext ? this.listOfInfoPlayers.firstPlayer : this.listOfInfoPlayers.secondPlayer;
  }

  makeMove(idx: number): void {
    if (!this.listOfInfoPlayers.squares[idx]) {
      this.player === this.listOfInfoPlayers.firstPlayer
        ? this.listOfInfoPlayers.squares.splice(idx, 1, 'X')
        : this.listOfInfoPlayers.squares.splice(idx, 1, 'O');
      this.listOfInfoPlayers.xIsNext = !this.listOfInfoPlayers.xIsNext;
      this.listOfInfoPlayers.counter++;
    }

    this.listOfInfoPlayers.lastWinner = this.calculateWinner(this.listOfInfoPlayers.squares);

    if (this.listOfInfoPlayers.lastWinner === this.listOfInfoPlayers.firstPlayer) {
      this.listOfInfoPlayers.firstScore = this.listOfInfoPlayers.firstScore + 1;
    } else if (this.listOfInfoPlayers.lastWinner === this.listOfInfoPlayers.secondPlayer) {
      this.listOfInfoPlayers.secondScore = this.listOfInfoPlayers.secondScore + 1;
    }

    if (this.listOfInfoPlayers.counter > 6) {
      this.checkerForDraw();
    }
  }

  checkerForDraw(): void {
    let isOnlyDraw = true;

    if (this.listOfInfoPlayers.counter === 8) {
      const indexOfLastElement = this.listOfInfoPlayers.squares.indexOf('');

      this.listOfInfoPlayers.xIsNext
        ? (this.listOfInfoPlayers.squares[indexOfLastElement] = 'X')
        : (this.listOfInfoPlayers.squares[indexOfLastElement] = 'O');
      if (this.calculateWinner(this.listOfInfoPlayers.squares) !== '') {
        isOnlyDraw = false;
        this.listOfInfoPlayers.squares.splice(indexOfLastElement, 1, '');
      }
    }

    for (let i = 0; i < this.listOfInfoPlayers.squares.length; i++) {
      if (isOnlyDraw === true && this.listOfInfoPlayers.squares[i] === '') {
        this.listOfInfoPlayers.squares[i] = 'X';
        if (this.calculateWinner(this.listOfInfoPlayers.squares) !== '') {
          isOnlyDraw = false;
        } else {
          this.listOfInfoPlayers.squares[i] = 'O';
          this.calculateWinner(this.listOfInfoPlayers.squares) !== '' ? (isOnlyDraw = false) : (isOnlyDraw = true);
        }
        this.listOfInfoPlayers.squares.splice(i, 1, '');
      } else if (isOnlyDraw === false) {
        break;
      }
    }

    if (isOnlyDraw) {
      this.listOfInfoPlayers.counter = 9;
    }
  }

  calculateWinner(squares: string[]): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < lines.length; i++) {
      if (
        squares[lines[i][0]] &&
        squares[lines[i][0]] === squares[lines[i][1]] &&
        squares[lines[i][0]] === squares[lines[i][2]]
      ) {
        return squares[lines[i][0]] === 'X' ? this.listOfInfoPlayers.firstPlayer : this.listOfInfoPlayers.secondPlayer;
      }
    }

    return '';
  }

  receiveFormData($event: nicknames): void {
    this.listOfInfoPlayers = $event;
    this.newGame('Continue');
  }
}
