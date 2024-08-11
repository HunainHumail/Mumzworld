import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../../types';

const initialState: ProductState = {
  products: [],
  productDetails: undefined,
  loading: false,
  error: undefined,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetailsRequest(state) {
      state.loading = true;
    },
    fetchProductDetailsSuccess(state, action: PayloadAction<Product>) {
      state.loading = false;
      state.productDetails = action.payload;
    },
    fetchProductDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} = productSlice.actions;

export default productSlice.reducer;
