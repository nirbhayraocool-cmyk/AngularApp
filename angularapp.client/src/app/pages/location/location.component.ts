import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  standalone: false,
  styleUrl: './location.component.css'
})
export class LocationComponent {
  address = 'Hazratganj, Lucknow, Uttar Pradesh';   // asli address yahan likho
  phone = '+91 88741 96809';
  timings = 'Mon - Sun: 10:30 AM to 8:30 PM';        // asli timings likho
  mapUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=Hazratganj,+Lucknow&output=embed'
    );
  }
}
