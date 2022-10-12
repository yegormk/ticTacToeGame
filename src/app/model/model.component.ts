import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { playersInfo } from '../Interfaces/information.interface';

@Component({
  selector: 'app-model-window',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  @Output() formEvent = new EventEmitter<playersInfo>();

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstPlayer: new FormControl('Player 1', [Validators.required]),
      secondPlayer: new FormControl('Player 2', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.formEvent.emit({
        firstPlayer: this.registerForm.value.firstPlayer,
        secondPlayer: this.registerForm.value.secondPlayer,
        firstScore: 0,
        secondScore: 0,
      });
    }
  }
}
