import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import useProductListViewModel from '../viewmodels/ProductListViewModal';
import ProductList from '../components/ProductList';
import { ProductListScreenNavigationProp } from '../navigation';

interface Props {
  navigation: ProductListScreenNavigationProp;
}

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const { products, loading } = useProductListViewModel();

  return (
    <View>
      {loading ? <ActivityIndicator /> : <ProductList products={products} />}
    </View>
  );
};

export default ProductListScreen;
