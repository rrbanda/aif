export interface Product {
  id: string;
  name: string;
  vendor: string;
  layer: string;
  role: string;
  icon?: string;
  url?: string;
  features?: string[];
  variants?: string[];
  options?: string[];
}

export interface Layer {
  id: string;
  title: string;
  order: number;
}

export interface TechStackConfig {
  products: Product[];
  layers: Layer[];
}
