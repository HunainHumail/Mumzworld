import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../store/slices/productSlice';
import { RootState } from '../types';

const useProductListViewModel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  console.log('PRODUCTS HERE :', products)

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return {
    products,
    loading,
  };
};

export default useProductListViewModel;
