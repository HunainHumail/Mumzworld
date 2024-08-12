import React, { useState, useRef } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { Product } from '../types';
import Fonts from '../utils/Fonts';
import { HeartOutlined, HeartFilled } from '../utils/svgs';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductItem: React.FC<Props> = ({ product, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkles = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

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

  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer]}>
      {product.price_range.minimum_price.discount?.percent_off ?
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>- {product.price_range.minimum_price.discount?.percent_off.toFixed(0)}%</Text>
        </View> : null}
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
      <View style={styles.productDetailView}>
        <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          {product.price.regularPrice.amount.value.toFixed(2)} {product.price.regularPrice.amount.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    height: verticalScale(150),
    width: '47%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
    overflow: 'hidden', // Ensure the banner stays within the card
  },
  image: {
    height: verticalScale(90),
    width: '100%',
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: 'black',
  },
  price: {
    fontSize: 12,
    color: '#888',
    fontFamily: Fonts.type.bold,
  },
  heartButton: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#dfebfc',
    zIndex: 10,
    padding: 5,
    alignSelf: 'flex-end',
    top: 5,
    right: 5,
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
    backgroundColor: '#dfebfc',
    paddingVertical: 8,
    borderRadius: 8,
  },
  bannerContainer: {
    position: 'absolute',
    top: 10,
    left: -30,
    width: '60%',
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    transform: [{ rotate: '-45deg' }], // Rotate to create the cross shape
    zIndex: 1,
  },
  bannerText: {
    color: 'white',
    fontFamily: Fonts.type.semibold,
    fontSize: 12,
    textAlign: 'center',
    transform: [{ rotate: '0deg' }], // Rotate text to be horizontal
  },
});

export default ProductItem;
