import { call, put, takeEvery, CallEffect, PutEffect } from 'redux-saga/effects';
import { fetchProductList, fetchProductDetails } from '../../api/productApi';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} from '../slices/productSlice';

// Define types for the expected return values from API calls
type Product = any; // Replace with your actual Product type
type FetchProductsResponse = any;
type FetchProductDetailsResponse = Product;

function* handleFetchProducts(): Generator<CallEffect<FetchProductsResponse> | PutEffect<any>, void, FetchProductsResponse> {
  try {
    // Assuming fetchProductList returns a Promise<Product[]>
    const products: FetchProductsResponse = yield call(fetchProductList) as FetchProductsResponse;
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* handleFetchProductDetails(
  action: ReturnType<typeof fetchProductDetailsRequest>
): Generator<CallEffect<FetchProductDetailsResponse> | PutEffect<any>, void, FetchProductDetailsResponse> {
  try {
    // Assuming fetchProductDetails returns a Promise<Product>
    const productDetails: FetchProductDetailsResponse = yield call(fetchProductDetails, action.payload) as FetchProductDetailsResponse;
    yield put(fetchProductDetailsSuccess(productDetails));
  } catch (error: any) {
    yield put(fetchProductDetailsFailure(error.message));
  }
}

export default function* productSagas() {
  yield takeEvery(fetchProductsRequest.type, handleFetchProducts);
  yield takeEvery(fetchProductDetailsRequest.type, handleFetchProductDetails);
}
