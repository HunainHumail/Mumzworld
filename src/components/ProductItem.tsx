import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductItem: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{product.name}</Text>
        {/* <Text>{product.price}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
