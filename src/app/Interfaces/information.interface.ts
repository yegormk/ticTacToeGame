export interface playersInfo {
  firstPlayer: string;
  firstScore: number;
  secondPlayer: string;
  secondScore: number;
}

export interface infoOfGame {
  squares: string[];
  xIsNext: boolean;
  counter: number;
  lastWinner: string;
  freshPage: boolean;
}
