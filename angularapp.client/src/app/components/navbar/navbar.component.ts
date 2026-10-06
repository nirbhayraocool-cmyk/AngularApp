import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  shopName = 'DS Jewellers';

  constructor(public wishlist: WishlistService) { }
}
