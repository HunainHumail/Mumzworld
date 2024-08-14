import axios from 'axios';
import { Product, ProductDetails, ProductsResponse } from '../types';

export const fetchProductList = async (): Promise<Product[]> => {
  const response = await axios.get('https://storage.googleapis.com/mumzrn/product-list-large');
  return response.data.data.products.items as Product[];
};

export const fetchProductDetails = async (productId: number): Promise<ProductDetails[]> => {
  const url = 'https://storage.googleapis.com/mumzrn/product';
  const response = await axios.get<ProductsResponse>(url);
  const productDetailsList = response.data.data.product;

  if (!productDetailsList || productDetailsList.length === 0) {
    throw new Error(`Product with the original ID not found`);
  }

  const modifiedProductDetailsList = productDetailsList.map(product => ({
    ...product,
    id: productId,
  }));

  console.log('Modified Product Details List with Updated ID:', modifiedProductDetailsList);
  
  return modifiedProductDetailsList;
};