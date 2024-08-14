import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsRequest } from '../store/slices/productSlice';
import { RootState } from '../types';

const useProductDetailsViewModel = (productId: string) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state: RootState) => state.products.productDetails);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProductDetailsRequest(parseInt(productId)));
  }, [dispatch, productId]);

  return {
    productDetails,
    loading,
  };
};

export default useProductDetailsViewModel;
