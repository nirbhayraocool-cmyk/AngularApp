import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import GLightbox from 'glightbox';
import { Category, Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

register();

interface Slide { bg: string; image: string; symbol: string; tag: string; title: string; text: string; btn: string; }
interface Occasion { name: string; text: string; symbol: string; a: string; b: string; category: string; image: string; }
interface Review { name: string; text: string; }
interface VideoItem { title: string; symbol: string; src: string; poster: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // ---------- Hero slider ----------
  // image: yahan apni photo ka path ya URL likho
  slides: Slide[] = [
    { bg: 'radial-gradient(circle at 75% 50%, #8c1d36, #3d0914 72%)', image: 'https://plus.unsplash.com/premium_photo-1681486928780-67d70f1ea3c2?q=80&w=832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', symbol: 'ring', tag: 'Welcome to DS Jewellers', title: 'Timeless Gold Rings', text: 'Designs that celebrate every precious moment.', btn: 'Shop Now' },
    { bg: 'radial-gradient(circle at 75% 50%, #8a5a14, #2a1204 72%)', image: 'https://plus.unsplash.com/premium_photo-1724762183134-c17cf5f5bed2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', symbol: 'necklace', tag: 'Bridal Collection', title: 'Make Your Day Shine', text: 'Necklace sets for the perfect wedding look.', btn: 'Explore Bridal' },
    { bg: 'radial-gradient(circle at 75% 50%, #3a2a7a, #0b1430 72%)', image: 'https://plus.unsplash.com/premium_photo-1724762183134-c17cf5f5bed2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', symbol: 'diamond', tag: 'Diamond Collection', title: 'Sparkle That Lasts', text: 'Brilliance that makes every moment stand out.', btn: 'See Diamonds' },
    { bg: 'radial-gradient(circle at 75% 50%, #12766d, #062a2a 72%)', image: 'https://images.unsplash.com/photo-1760786933027-fe2ad82957f9?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', symbol: 'bangle', tag: 'Festive Special', title: 'Golden Bangles', text: 'Classic and modern designs for every festival.', btn: 'View Bangles' }
  ];
  // Pehli slide ki copy aakhir me, taaki slider hamesha aage hi chale
  track: Slide[] = [...this.slides, this.slides[0]];
  pos = 0;
  animate = true;
  private lock = false;
  private timer: any;
  private fallback: any;

  sparks = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 53) % 100,
    size: 3 + (i % 4) * 2,
    delay: (i * 0.9) % 8,
    dur: 6 + (i % 5) * 2
  }));

  // ---------- Categories, collection ----------
  categories: Category[];
  chips: string[];
  all: Product[];
  cat = 'All';
  query = '';

  // ---------- Video ----------
  videoSrc = 'videos/hero.mp4';          // asli video lagane par likho:
  paused = false;

  // ---------- Occasions, reviews ----------
  occasions: Occasion[] = [
    { name: 'Wedding', text: 'Bridal sets for the big day', symbol: 'necklace', a: '#8c1d36', b: '#3d0914', category: 'Necklaces', image: 'https://plus.unsplash.com/premium_photo-1724762183134-c17cf5f5bed2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Festival', text: 'Gold for Diwali and Dhanteras', symbol: 'bangle', a: '#8a5a14', b: '#2a1204', category: 'Bangles', image: 'https://plus.unsplash.com/premium_photo-1682090864876-c452a35292cb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Gifting', text: 'Pieces that make her smile', symbol: 'pendant', a: '#7a1f4f', b: '#2a0a1c', category: 'Pendants', image: 'https://plus.unsplash.com/premium_photo-1724762184738-838e4d502b31?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Daily Wear', text: 'Light and everyday elegant', symbol: 'ring', a: '#12766d', b: '#062a2a', category: 'Rings', image: 'https://plus.unsplash.com/premium_photo-1724762184033-9cc2c795d867?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Anniversary', text: 'A sparkle for every year together', symbol: 'earring', a: '#4a1a5c', b: '#1c0a28', category: 'Earrings', image: 'images/jewellery_ang.jpg' },
    { name: 'Engagement', text: 'Diamonds for the big yes', symbol: 'diamond', a: '#1c3a7a', b: '#0b1430', category: 'Diamonds', image: 'images/jewellery_wedd.jpg' }
  ];
  reviews: Review[] = [
    { name: 'Priya S.', text: 'Lovely finish and very friendly service.' },
    { name: 'Ankush M.', text: 'Easy to enquire on WhatsApp, and the weight and price were clear.' },
    { name: 'Anita K.', text: 'Bought a pendant as a gift and she loved it.' }
  ];

  // ---------- Occasions slider ----------
  occTrack: Occasion[] = [...this.occasions, ...this.occasions];
  opos = 0;
  oanimate = true;
  per = 3;
  private olock = false;
  private otimer: any;
  private ofallback: any;
  private touchX: number | null = null;
  private onResize = () => this.updateView();

  // ---------- Video gallery ----------
  videos: VideoItem[] = [
    { title: 'Diamond 360° View', symbol: 'diamond', src: 'videos/v1.mp4', poster: '' },
    { title: 'Bridal Necklace Shine', symbol: 'necklace', src: 'videos/v2.mp4', poster: '' },
    { title: 'Gold Bangles Spin', symbol: 'bangle', src: 'videos/v3.mp4', poster: '' }
  ];
  videoLoop: VideoItem[] = [...this.videos, ...this.videos];

  // ---------- Calculator ----------
  weight = 10;
  purity = 0.9167;
  rate = 0;
  making = 8;

  private observer?: IntersectionObserver;

  constructor(
    productService: ProductService,
    public wishlist: WishlistService,
    private host: ElementRef<HTMLElement>
  ) {
    this.categories = productService.categories;
    this.all = productService.getAll();
    this.chips = ['All', ...this.categories.map(c => c.name), 'Saved'];
  }

  // ---------- Lifecycle ----------
  ngOnInit(): void {
    this.updateView();
    window.addEventListener('resize', this.onResize);
    this.startAuto();
    this.startOccAuto();
  }

  ngAfterViewInit(): void {
    const banner = this.host.nativeElement.querySelector('.vbig video') as HTMLVideoElement | null;
    if (banner) {
      banner.muted = true;
      banner.play().catch(() => { });
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          this.observer?.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    this.host.nativeElement.querySelectorAll('.reveal').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearTimeout(this.fallback);
    clearInterval(this.otimer);
    clearTimeout(this.ofallback);
    window.removeEventListener('resize', this.onResize);
    this.observer?.disconnect();
  }

  // ---------- Hero slider ----------
  get transform(): string { return `translateX(-${this.pos * 100}%)`; }
  get dot(): number { return this.pos % this.slides.length; }

  startAuto(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 4000);
  }

  next(): void { this.move(this.pos + 1); }

  prev(): void {
    if (this.lock) return;
    if (this.pos === 0) {
      this.lock = true;
      this.animate = false;
      this.pos = this.slides.length;
      setTimeout(() => {
        this.lock = false;
        this.animate = true;
        this.move(this.slides.length - 1);
      }, 50);
    } else {
      this.move(this.pos - 1);
    }
  }

  goTo(i: number): void {
    this.move(i);
    this.startAuto();
  }

  private move(p: number): void {
    if (this.lock) return;
    this.lock = true;
    this.pos = p;
    clearTimeout(this.fallback);
    this.fallback = setTimeout(() => this.finish(), 800);
  }

  onEnd(e: Event): void {
    if (e.target === e.currentTarget) this.finish();
  }

  private finish(): void {
    clearTimeout(this.fallback);
    if (this.pos === this.slides.length) {
      this.animate = false;
      this.pos = 0;
      setTimeout(() => (this.animate = true), 50);
    }
    this.lock = false;
  }

  // ---------- Occasions slider ----------
  get oTransform(): string { return `translateX(-${(this.opos * 100) / this.per}%)`; }
  get oDot(): number { return this.opos % this.occasions.length; }

  updateView(): void {
    const w = window.innerWidth;
    this.per = w > 900 ? 3 : w > 600 ? 2 : 1;
  }

  startOccAuto(): void {
    clearInterval(this.otimer);
    this.otimer = setInterval(() => this.oNext(), 3500);
  }

  oNext(): void { this.oMove(this.opos + 1); }

  oPrev(): void {
    if (this.olock) return;
    if (this.opos === 0) {
      this.olock = true;
      this.oanimate = false;
      this.opos = this.occasions.length;
      setTimeout(() => {
        this.olock = false;
        this.oanimate = true;
        this.oMove(this.occasions.length - 1);
      }, 50);
    } else {
      this.oMove(this.opos - 1);
    }
  }

  oGo(i: number): void {
    this.oMove(i);
    this.startOccAuto();
  }

  private oMove(p: number): void {
    if (this.olock) return;
    this.olock = true;
    this.opos = p;
    clearTimeout(this.ofallback);
    this.ofallback = setTimeout(() => this.oFinish(), 800);
  }

  onOccEnd(e: Event): void {
    if (e.target === e.currentTarget) this.oFinish();
  }

  private oFinish(): void {
    clearTimeout(this.ofallback);
    if (this.opos >= this.occasions.length) {
      this.oanimate = false;
      this.opos -= this.occasions.length;
      setTimeout(() => (this.oanimate = true), 50);
    }
    this.olock = false;
  }

  // ---------- Swipe (mobile) ----------
  touchStart(e: TouchEvent): void {
    this.touchX = e.touches[0].clientX;
  }

  touchEnd(e: TouchEvent, which: 'hero' | 'occ'): void {
    if (this.touchX === null) return;
    const d = e.changedTouches[0].clientX - this.touchX;
    this.touchX = null;
    if (Math.abs(d) < 40) return;
    if (which === 'hero') {
      d < 0 ? this.next() : this.prev();
      this.startAuto();
    } else {
      d < 0 ? this.oNext() : this.oPrev();
      this.startOccAuto();
    }
  }

  // ---------- Collection ----------
  get filtered(): Product[] {
    const q = this.query.trim().toLowerCase();
    return this.all.filter(p => {
      const inCat = this.cat === 'All' ? true
        : this.cat === 'Saved' ? this.wishlist.has(p.id)
          : p.category === this.cat;
      return inCat && p.name.toLowerCase().includes(q);
    });
  }

  pick(category: string): void {
    this.cat = category;
    this.scrollToShop();
  }

  scrollToShop(): void {
    this.host.nativeElement.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ---------- Bada video banner ----------
  togglePause(): void {
    this.paused = !this.paused;
    const video = this.host.nativeElement.querySelector('.vbig video') as HTMLVideoElement | null;
    if (video) {
      this.paused ? video.pause() : video.play().catch(() => { });
    }
  }

  // ---------- Video gallery ----------
  onGalleryClick(e: Event): void {
    const el = (e.target as HTMLElement).closest('[data-i]');
    if (el) this.openVideo(+el.getAttribute('data-i')!);
  }

  openVideo(index: number): void {
    const playable = this.videos.filter(v => v.src);
    const pos = playable.indexOf(this.videos[index]);
    if (pos < 0) return;
    const box = GLightbox({
      elements: playable.map(v => ({ href: v.src, type: 'video', source: 'local', width: '900px', title: v.title })),
      autoplayVideos: true,
      touchNavigation: true,
      loop: true
    });
    box.openAt(pos);
  }

  // ---------- Calculator ----------
  get gold(): number { return this.weight * this.purity * this.rate; }
  get makingAmt(): number { return (this.gold * this.making) / 100; }
  get total(): number { return this.gold + this.makingAmt; }
}
