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

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductItem: React.FC<Props> = ({ product, onPress }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const cartScaleValue = useRef(new Animated.Value(1)).current;
  const sparkles = useRef([...Array(5)].map(() => new Animated.Value(0))).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const isLoading = useSelector((state: RootState) => state.products.productLoading[product.id]);



  const toggleFavorite = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    // Start the animation for the heart
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger sparkle effect if liked
    if (newValue) {
      sparkles.forEach((sparkle, index) => {
        Animated.timing(sparkle, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          delay: index * 50,
        }).start(() => {
          Animated.timing(sparkle, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      });
    }
  };

  const toggleCart = () => {
    const newValue = !inCart;
    setInCart(newValue);

    // Start the animation for the cart icon
    Animated.sequence([
      Animated.timing(cartScaleValue, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(cartScaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderSparkles = () => {
    return sparkles.map((sparkle, index) => {
      const angle = (index * 2 * Math.PI) / sparkles.length;
      const translateX = sparkle.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.cos(angle) * 20], // Adjust 20 to control distance
      });
      const translateY = sparkle.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.sin(angle) * 20],
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.sparkle,
            {
              transform: [{ translateX }, { translateY }],
              opacity: sparkle, // Fade out sparkles
            },
          ]}
        />
      );
    });
  };

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
    console.log('HADNLE PRESS:')
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
      <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </Animated.View>
        {isFavorite && renderSparkles()}
      </TouchableOpacity>
      <FastImage
        source={{ uri: product.small_image.url }}
        style={styles.image}
        resizeMode="contain"
      />
      {product.price_range.minimum_price.discount?.percent_off ?
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
            {product.price.regularPrice.amount.value.toFixed(2)}
          </Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={1} style={styles.addToCartButton} onPress={toggleCart}>
        <Animated.View style={{ transform: [{ scale: cartScaleValue }] }}>
          {inCart ? <ShoppingCartFilled /> : <ShoppingCartOutlined />}
        </Animated.View>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
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
  heartButton: {
    position: 'absolute',
    borderRadius: 50,
    zIndex: 10,
    padding: 10,
    right: 0
  },
  sparkle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFD700', // Gold color for sparkles
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
  addToCartButton: {
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#f4f4f6",
    backgroundColor: "#fbe6e8",
    height: verticalScale(50),
    width: verticalScale(50),
    position: 'absolute',
    bottom: verticalScale(10),
    right: moderateScale(-20),
    justifyContent: 'center',
    alignItems: 'center'
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
});

export default ProductItem;
