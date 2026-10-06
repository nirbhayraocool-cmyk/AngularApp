export interface Product {
  id: number;
  name: string;
  category: string;
  metal: string;
  weight: number;
  price: number;
  symbol: string;      // ring, necklace, earring, bangle, diamond, pendant
  image?: string;      // asli photo ka path (baad me)
}

export interface Category {
  name: string;
  symbol: string;
  a: string;           // gradient ka pehla rang
  b: string;           // gradient ka doosra rang
  image?: string;      // category ki photo
}
