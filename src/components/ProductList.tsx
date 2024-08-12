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
        removeClippedSubviews={true} // Optimizes memory usage
        initialNumToRender={10} // Adjust based on your needs
        maxToRenderPerBatch={10} // Number of items rendered per batch
        windowSize={21} // Number of items to keep in memory (initialNumToRender + maxToRenderPerBatch)
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight, // Set a fixed height as suggested
    // width: screenWidth, // Use screen width
    padding: 10,
    backgroundColor: '#fef1f1'
  },
});

export default ProductList;
