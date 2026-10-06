import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: false,
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(public wishlist: WishlistService, private products: ProductService) { }

  get colors() {
    return this.products.colorsOf(this.product.category);
  }

  get whatsappLink(): string {
    const text = `Hello DS Jewellers, I am interested in ${this.product.name}`;
    return 'https://wa.me/918874196809?text=' + encodeURIComponent(text);
  }
}
