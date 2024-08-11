import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../types';
import Fonts from '../utils/Fonts';

interface Props {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const itemWidth = 180;

const ProductItem: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, { width: itemWidth }]}>
      <TouchableOpacity>
        
      </TouchableOpacity>
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
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingBottom: 8,
    height: 190,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
    justifyContent: 'space-between'
  },
  image: {
    height: 100,
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.type.bold
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: Fonts.type.medium
  },
});

export default ProductItem;
