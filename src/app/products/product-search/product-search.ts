import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ov-product-search',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.scss'
})
export class ProductSearch {
  searchTermUpdated= output<string>();
  searchTerm: string = '';

  searchChanged(newString: Event) {
    this.searchTermUpdated.emit(newString as any as string);
  }
}
