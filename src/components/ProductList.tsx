import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ProductItem from './ProductItem';
import { Product } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../utils/constants';

interface Props {
  products: Product[];
  onProductPress: (productId: string) => void;
}
type FlashListRenderItem<T> = (info: { item: T; index: number }) => React.ReactElement;

const ProductList: React.FC<Props> = ({ products, onProductPress }) => {
  const renderItem: FlashListRenderItem<Product> = ({ item, index }) => (
    <ProductItem product={item} onPress={() => onProductPress(item.id.toString())} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        // estimatedItemSize={screenHeight}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight, // Set a fixed height as suggested
    width: screenWidth, // Use screen width
    padding: 16,
    // backgroundColor: 'grey'
  },
});

export default ProductList;
