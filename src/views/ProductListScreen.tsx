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

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      {loading ? <ActivityIndicator /> : <ProductList products={products} onProductPress={handleProductPress} />}
    </View>
  );
};

export default ProductListScreen;
