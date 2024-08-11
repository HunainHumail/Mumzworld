import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../types';

interface Props {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const itemWidth = 180;

const ProductItem: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, { width: itemWidth }]}>
      <Image
        source={{ uri: product.small_image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        {product.price.regularPrice.amount.value} {product.price.regularPrice.amount.currency}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 8,
    height: 190,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  image: {
    height: 100,
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductItem;
