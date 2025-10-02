import { Component, DestroyRef, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'ov-product-search',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.scss'
})
export class ProductSearch {
  searchTermUpdated= output<string>();
  searchControl = new FormControl('');
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(value => {
      console.log('Search changed:', value);
      this.searchTermUpdated.emit(value as any as string);
    });
  }
}
