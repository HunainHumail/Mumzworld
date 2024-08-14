import { Product } from './Product';

export interface ProductState {
  products: Product[];
  productDetails?: Product;
  loading: boolean;
  productLoading: Record<string, boolean>
  error?: string;
  selectedProduct: Product | null;
}
