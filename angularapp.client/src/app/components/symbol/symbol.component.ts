import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  standalone: false,
  styleUrl: './symbol.component.css'
})
export class SymbolComponent {
  @Input() name = 'ring';
}
