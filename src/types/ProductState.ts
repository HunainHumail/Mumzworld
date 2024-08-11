import { Product } from './Product';

export interface ProductState {
  products: Product[];
  productDetails?: Product;
  loading: boolean;
  error?: string;
}
