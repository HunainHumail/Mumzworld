import axios from 'axios';
import { Product, ProductDetails } from '../types';

export const fetchProductList = async (): Promise<Product[]> => {
  const response = await axios.get('https://storage.googleapis.com/mumzrn/product-list-lite');
  return response.data.data.products.items as Product[];  // Adjusting the path to fetch products
};

export const fetchProductDetails = async (productId: string): Promise<ProductDetails> => {
  const response = await axios.get<ProductDetails>(`https://storage.googleapis.com/mumzrn/product`);
  return response.data;
};
