import React from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../types';

interface Props {
  products: Product[];
  onProductPress: (productId: string) => void;
}

const ProductList: React.FC<Props> = ({ products, onProductPress }) => {
  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductItem product={item} onPress={() => onProductPress(item.id)} />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProductList;
