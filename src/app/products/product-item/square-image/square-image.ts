import { Component, input } from '@angular/core';

@Component({
  selector: 'ov-square-image',
  imports: [],
  templateUrl: './square-image.html',
  styleUrl: './square-image.scss'
})
export class SquareImage {
  src = input("path");
  alt = input("alternative text")
}
