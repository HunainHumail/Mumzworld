import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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
      {loading ? <ActivityIndicator color={"#b32546"} style={styles.activityIndicatorStyle} /> : <ProductList products={products} />}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  activityIndicatorStyle: {height: '100%', justifyContent: 'center', alignItems: 'center'}
})