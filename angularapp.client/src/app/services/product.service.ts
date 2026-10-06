import { Injectable } from '@angular/core';
import { Category, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly categories: Category[] = [
    { name: 'Rings', symbol: 'ring', a: '#8c1d36', b: '#3d0914', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Necklaces', symbol: 'necklace', a: '#8a5a14', b: '#2a1204', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Earrings', symbol: 'earring', a: '#4a1a5c', b: '#1c0a28', image: 'https://images.unsplash.com/photo-1652766540048-de0a878a3266?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Bangles', symbol: 'bangle', a: '#12766d', b: '#062a2a', image: 'https://images.unsplash.com/photo-1634957975483-17a583180cbf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Diamonds', symbol: 'diamond', a: '#1c3a7a', b: '#0b1430', image: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Pendants', symbol: 'pendant', a: '#7a1f4f', b: '#2a0a1c', image: 'https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  // Sample data: naam, weight, price aur photo apne hisaab se badal lena
  private products: Product[] = [
    { id: 1, name: 'Royal Gold Ring', category: 'Rings', metal: '22K Gold', weight: 5.5, price: 32000, symbol: 'ring', image: 'https://images.unsplash.com/photo-1720093601709-66ce9c0068a1?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Solitaire Diamond Ring', category: 'Diamonds', metal: 'Diamond', weight: 4.2, price: 58000, symbol: 'ring', image: 'https://images.unsplash.com/photo-1613945407943-59cd755fd69e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Bridal Necklace Set', category: 'Necklaces', metal: '22K Gold', weight: 38, price: 245000, symbol: 'necklace', image: 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Temple Design Haar', category: 'Necklaces', metal: '22K Gold', weight: 25, price: 168000, symbol: 'necklace', image: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Jhumka Earrings', category: 'Earrings', metal: '22K Gold', weight: 8, price: 52000, symbol: 'earring', image: 'https://images.unsplash.com/photo-1652766540048-de0a878a3266?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, name: 'Diamond Studs', category: 'Diamonds', metal: 'Diamond', weight: 2.5, price: 36000, symbol: 'diamond', image: 'https://images.unsplash.com/photo-1784746829625-b50da7a9d364?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, name: 'Classic Gold Bangles', category: 'Bangles', metal: '22K Gold', weight: 20, price: 135000, symbol: 'bangle', image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, name: 'Gold Heart Pendant', category: 'Pendants', metal: '22K Gold', weight: 3.2, price: 18500, symbol: 'pendant', image: 'https://images.unsplash.com/photo-1631965004544-1762fc696476?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  getAll(): Product[] { return this.products; }
  getFeatured(): Product[] { return this.products.slice(0, 4); }
  getCategories(): string[] { return ['All', ...this.categories.map(c => c.name)]; }
  colorsOf(category: string): Category | undefined {
    return this.categories.find(c => c.name === category);
  }
}
