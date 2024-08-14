import React, { useState, useRef } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Product } from '../types';
import Fonts from '../utils/Fonts';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, ShoppingCartFilled } from '../utils/svgs';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import DiscountComponent from './DiscountComponent';
import Tag from './Tag';
import { RootState } from '../store/slices';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsRequest } from '../store/slices/productSlice';
import AnimatedHeart from './AnimatedHeart';
import AnimatedCartButton from './AnimatedCartButton';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const circleScale = useRef(new Animated.Value(0)).current;
  const isLoading = useSelector((state: RootState) => state.products.productLoading[product.id]);
  const discount = product.price_range.minimum_price.discount?.percent_off ? true : false


  const handlePressIn = () => {
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(circleScale, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    dispatch(fetchProductDetailsRequest(product.id));
  };

  
  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPress={handlePress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      style={[styles.itemContainer]}
    >
      <Animated.View 
        style={[
          styles.circleOverlay, 
          { transform: [{ scale: circleScale }] }
        ]} 
      />
      <AnimatedHeart
        isFavorite={isFavorite}
        onToggleFavorite={(newValue) => setIsFavorite(newValue)}
      />
      <FastImage
        source={{ uri: product.small_image.url }}
        style={styles.image}
        resizeMode="contain"
      />
      {discount ?
        <View style={styles.discountComponent}>
          <DiscountComponent percent={product.price_range.minimum_price.discount?.percent_off.toFixed(0)} />
        </View> : null}

      <View style={styles.tagsView}>
        {product.is_yalla.length ? <View style={styles.yalla}><Tag height={15} width={15} color='#e7b008' /><Text style={styles.yallaText}>Yalla</Text></View> : <View style={styles.space}/>}
        {product.product_label.label_text ? <View style={styles.yalla}><Tag color={product.product_label.background_color} height={15} width={15} /><Text style={styles.yallaText}>{product.product_label.label_text}</Text></View> : null}
      </View>

      <View style={styles.productDetailView}>
        <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
        <View style={styles.priceView}>
          <Text style={styles.currency}>{product.price.regularPrice.amount.currency}</Text>
          <Text style={styles.price}>
            {discount ? product.price_range.minimum_price.final_price.value.toFixed(2) : product.price_range.minimum_price.regular_price.value.toFixed(2)}
          </Text>
        </View>
        {discount ?
        <Text style={styles.discount}>
        {product.price_range.minimum_price.regular_price.value.toFixed(2)}
      </Text> : null
        }
      </View>
      <AnimatedCartButton
        inCart={inCart}
        onToggleCart={(newValue) => setInCart(newValue)}
      />
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#b32546" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '45%',
    // overflow: 'hidden', // Ensures circle doesn't go outside the item
  },
  circleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fbe6e8',
    borderRadius: 8,
    zIndex: 0,
  },
  image: {
    height: verticalScale(80),
    width: '100%',
    borderRadius: 8,
    marginTop: verticalScale(30),
  },
  name: {
    fontSize: 10,
    fontFamily: Fonts.type.medium,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: '#888',
    fontFamily: Fonts.type.bold,
  },
  productDetailView: {
    paddingHorizontal: 8,
    paddingRight: 50,
    paddingVertical: 8,
    borderRadius: 8,
  },
  discountComponent: {
    position: 'absolute',
    zIndex: 100,
    top: verticalScale(5),
    left: moderateScale(5)
  },
  priceView: {
    flexDirection: 'row',
    marginTop: verticalScale(2)
  },
  currency: {
    fontSize: 10,
    marginTop: verticalScale(2),
    marginRight: moderateScale(2),
    color: '#888',
    fontFamily: Fonts.type.bold,
  },
  yalla: {
    flexDirection: 'row'
  },
  yallaText: {
    fontFamily: Fonts.type.semibold,
    fontSize: 10,
    marginLeft: 2
  },
  tagsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    paddingHorizontal: 5
  },
  space: {
    height: 15,
    width: 15
  },
  overlay: {
    position: 'absolute', // Absolute positioning
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  discount: {
    fontFamily: Fonts.type.light,
    fontSize: 12,
    textDecorationLine: 'line-through'
  }
});

export default ProductItem;
