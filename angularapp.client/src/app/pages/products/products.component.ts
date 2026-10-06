import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: false,
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  all: Product[];
  categories: string[];
  selected = 'All';

  constructor(productService: ProductService) {
    this.all = productService.getAll();
    this.categories = productService.getCategories();
  }

  get filtered(): Product[] {
    return this.selected === 'All' ? this.all : this.all.filter(p => p.category === this.selected);
  }
}
