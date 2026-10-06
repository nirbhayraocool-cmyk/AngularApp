import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private ids = signal<number[]>(this.load());
  readonly count = computed(() => this.ids().length);

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  toggle(id: number): void {
    this.ids.update(list => list.includes(id) ? list.filter(i => i !== id) : [...list, id]);
    try { localStorage.setItem('ds-saved', JSON.stringify(this.ids())); } catch { }
  }

  private load(): number[] {
    try { return JSON.parse(localStorage.getItem('ds-saved') || '[]'); } catch { return []; }
  }
}
