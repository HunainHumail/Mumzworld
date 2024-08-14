import axios from 'axios';
import { Product, ProductDetails, ProductsResponse } from '../types';

export const fetchProductList = async (): Promise<Product[]> => {
  const response = await axios.get('https://storage.googleapis.com/mumzrn/product-list-large');
  return response.data.data.products.items as Product[];
};

export const fetchProductDetails = async (productId: number): Promise<ProductDetails[]> => {
  const url = 'https://storage.googleapis.com/mumzrn/product';
  const response = await axios.get<ProductsResponse>(url);

  // Assume the product array contains two objects, one for each language
  const productDetailsList = response.data.data.product;
  console.log('PRODUCT DETAIL LIST: ', productDetailsList)

  if (!productDetailsList || productDetailsList.length === 0) {
    throw new Error(`Product with the original ID not found`);
  }

  // Modify the IDs for both language versions
  const modifiedProductDetailsList = productDetailsList.map(product => ({
    ...product,
    id: productId, // Replace the ID with the provided productId
  }));

  console.log('Modified Product Details List with Updated ID:', modifiedProductDetailsList);
  
  return modifiedProductDetailsList;
};