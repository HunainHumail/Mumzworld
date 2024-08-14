import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../../types';

const initialState: ProductState = {
  products: [],
  productDetails: undefined,
  loading:  false,
  productLoading: {},
  error: undefined,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = true;
    },
    fetchProductDetailsRequest(state, action: PayloadAction<number>) {
      state.productLoading[action.payload] = true; // Set loading for the specific product ID
    },
    fetchProductDetailsSuccess(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
      state.productLoading[action.payload[0].id] = false; // Clear loading for the specific product ID
    },
    fetchProductDetailsFailure(state, action: PayloadAction<{ id: number; error: string }>) {
      state.error = action.payload.error;
      state.productLoading[action.payload.id] = false; // Clear loading for the specific product ID
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
