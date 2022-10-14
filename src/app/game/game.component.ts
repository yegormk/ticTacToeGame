import { Component, OnInit } from '@angular/core';

import { infoOfGame, playersInfo } from '../Interfaces/information.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  listOfInfoPlayers!: playersInfo;
  infoOfGame!: infoOfGame;

  ngOnInit(): void {
    this.listOfInfoPlayers = {
      firstPlayer: '',
      secondPlayer: '',
      firstScore: 0,
      secondScore: 0,
    };
    this.infoOfGame = {
      squares: [],
      xIsNext: true,
      counter: 0,
      lastWinner: '',
      freshPage: true,
    };
  }

  newGame(action: string): void {
    action === 'Continue' ? (this.infoOfGame.freshPage = false) : (this.infoOfGame.freshPage = true);
    this.infoOfGame.squares = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    this.infoOfGame.lastWinner = '';
    this.infoOfGame.counter = 0;
    this.infoOfGame.xIsNext = true;
  }

  isGameActive(): boolean {
    return !this.infoOfGame.lastWinner && !(this.infoOfGame.counter === 9) && !this.infoOfGame.freshPage;
  }

  get player(): string {
    return this.infoOfGame.xIsNext ? this.listOfInfoPlayers.firstPlayer : this.listOfInfoPlayers.secondPlayer;
  }

  makeMove(idx: number): void {
    if (this.infoOfGame.squares[idx] !== 'X' && this.infoOfGame.squares[idx] !== 'O') {
      this.player === this.listOfInfoPlayers.firstPlayer
        ? this.infoOfGame.squares.splice(idx, 1, 'X')
        : this.infoOfGame.squares.splice(idx, 1, 'O');
      this.infoOfGame.xIsNext = !this.infoOfGame.xIsNext;
      this.infoOfGame.counter++;
    }

    this.infoOfGame.lastWinner = this.calculateWinner(this.infoOfGame.squares);

    this.infoOfGame.lastWinner === this.listOfInfoPlayers.firstPlayer
      ? (this.listOfInfoPlayers.firstScore =
          this.listOfInfoPlayers.firstScore + Number(Boolean(this.infoOfGame.lastWinner)))
      : (this.listOfInfoPlayers.secondScore =
          this.listOfInfoPlayers.secondScore + Number(Boolean(this.infoOfGame.lastWinner)));

    if (
      !this.infoOfGame.xIsNext &&
      this.listOfInfoPlayers.secondPlayer === 'Artificial Intelligence' &&
      this.infoOfGame.lastWinner === ''
    ) {
      this.aiMove();
    }

    if (this.infoOfGame.counter > 6) {
      this.checkerForDraw();
    }
  }

  aiMove(): void {
    let arrEmpty = this.infoOfGame.squares.filter(s => s !== 'X' && s !== 'O');

    for (let i = 0; i < arrEmpty.length; i++) {
      const arrCopy = this.infoOfGame.squares.slice();
      arrCopy[Number(arrEmpty[i])] = 'O';

      if (this.calculateWinner(arrCopy) !== '') {
        this.makeMove(Number(arrEmpty[i]));
        return;
      } else {
        arrCopy[Number(arrEmpty[i])] = arrEmpty[i];
      }
    }
    this.makeMove(Number(arrEmpty[Math.floor(Math.random() * arrEmpty.length)]));
  }

  checkerForDraw(): void {
    let isOnlyDraw = true;

    if (this.infoOfGame.counter === 8) {
      const indexOfLastElement = this.infoOfGame.squares.indexOf(
        this.infoOfGame.squares.filter(cell => cell !== 'X' && cell !== 'O')[0]
      );

      this.infoOfGame.xIsNext
        ? (this.infoOfGame.squares[indexOfLastElement] = 'X')
        : (this.infoOfGame.squares[indexOfLastElement] = 'O');
      if (this.calculateWinner(this.infoOfGame.squares) !== '') {
        isOnlyDraw = false;
        this.infoOfGame.squares.splice(indexOfLastElement, 1, '');
      }
    }

    for (let i = 0; i < this.infoOfGame.squares.length; i++) {
      if (isOnlyDraw === true && this.infoOfGame.squares[i] !== 'X' && this.infoOfGame.squares[i] !== 'O') {
        this.infoOfGame.squares[i] = 'X';
        if (this.calculateWinner(this.infoOfGame.squares) !== '') {
          isOnlyDraw = false;
        } else {
          this.infoOfGame.squares[i] = 'O';
          this.calculateWinner(this.infoOfGame.squares) !== '' ? (isOnlyDraw = false) : (isOnlyDraw = true);
        }
        this.infoOfGame.squares.splice(i, 1, '');
      } else if (isOnlyDraw === false) {
        break;
      }
    }

    if (isOnlyDraw) {
      this.infoOfGame.counter = 9;
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

  receiveFormData($event: playersInfo): void {
    this.listOfInfoPlayers = $event;
    this.newGame('Continue');
  }
}
