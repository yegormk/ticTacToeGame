import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() value!: string;
}
