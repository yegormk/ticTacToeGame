import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export const materialModules = [MatButtonModule, MatInputModule, MatButtonModule];

@NgModule({
  imports: [CommonModule, materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
