import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, Animated } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import RenderHTML, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { RootStackParamList } from '../navigation';
import { ProductDetails } from '../types';
import ProductCarousel from '../components/ProductCarouselComponent';
import Fonts from '../utils/Fonts';
import { BackIcon } from '../utils/svgs';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import NavigationService from '../utils/NavigationService';
import AnimatedHeart from '../components/AnimatedHeart';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const [isArabic, setIsArabic] = useState(false);
  const productDetails: ReadonlyArray<ProductDetails> = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const animationValue = useRef(new Animated.Value(1)).current;
  const currentProductDetails = isArabic ? productDetails[0] : productDetails[1];

  const toggleLanguage = () => {
    setIsArabic(prev => !prev);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  useEffect(() => {
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulseAnimation());
    };

    pulseAnimation();
  }, [animationValue]);

  const animatedStyle = {
    transform: [{ scale: animationValue }],
  };

  const iframeModel = HTMLElementModel.fromCustomModel({
    tagName: 'iframe',
    mixedUAStyles: {
      width: '100%',
      height: 200,
    },
    contentModel: HTMLContentModel.mixed,
  });

  const customIframeRenderer = ({ tnode }) => {
    const { width: screenWidth } = useWindowDimensions();
    const attributes = tnode?.init?.domNode?.attribs || {};

    const { src, height = '200' } = attributes;

    if (!src) return null;

    return (
      <WebView
        style={{ width: screenWidth, height: parseInt(height) }}
        source={{ uri: src }}
        javaScriptEnabled
        domStorageEnabled
      />
    );
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const renderers = {
    iframe: customIframeRenderer,
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={[styles.header, isArabic && styles.rtlHeader]}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <BackIcon style={[styles.backIcon, isArabic && styles.flipIcon]} />
            </TouchableOpacity>
            <Button color={'#b32546'} title={`Switch to ${isArabic ? 'English' : 'Arabic'}`} onPress={toggleLanguage} />
          </View>
          <View style={styles.productImageView}>
            <AnimatedHeart isFavorite={isFavorite}
              onToggleFavorite={(newValue) => setIsFavorite(newValue)} />

            <ProductCarousel mediaGallery={currentProductDetails.media_gallery} />
            <View style={[styles.productDetailView, isArabic && styles.rtlText]}>
              <Text numberOfLines={2} style={[isArabic ? styles.productNameArabic : styles.productName]}>{currentProductDetails.name}</Text>
              <View style={isArabic ? styles.priceViewRTL : styles.priceView}>
                <Text style={[styles.productPrice, isArabic && styles.rtlText]}>{currentProductDetails.price?.regularPrice.amount.currency} {currentProductDetails.price_range.minimum_price.final_price.value.toFixed(2)}</Text>
                <Text style={styles.percentageOff}>-{currentProductDetails.price_range.minimum_price.discount?.percent_off}%</Text>
              </View>
              <Text style={[styles.regularPrice, isArabic && styles.rtlText]}>{currentProductDetails.price?.regularPrice.amount.currency} {currentProductDetails.price?.regularPrice.amount.value.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.featureView}>

          </View>
          <View style={styles.htmlView}>
            <RenderHTML
              contentWidth={useWindowDimensions().width}
              source={{ html: currentProductDetails.description.html }}
              customHTMLElementModels={customHTMLElementModels}
              renderers={renderers}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.addToCartButton, animatedStyle]}>
            <TouchableOpacity>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaTop: { backgroundColor: 'white', flex: 0 },
  safeAreaBottom: { flex: 1, backgroundColor: "#fef1f1" },
  scrollViewContent: { flexGrow: 1, paddingBottom: verticalScale(80) },
  productImageView: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productName: {
    fontFamily: Fonts.type.semibold,
    fontSize: 16,
    paddingRight: 80,
  },
  productNameArabic: {
    fontFamily: Fonts.type.semibold,
    fontSize: 16,
    paddingLeft: 80,
  },
  header: {
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  productDetailView: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
  },
  rtlText: {
    textAlign: 'right',
  },
  productPrice: {
    fontFamily: Fonts.type.bold,
    fontSize: 20
  },
  regularPrice: {
    fontFamily: Fonts.type.light,
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  backIcon: {
    // Additional styles for the back icon if needed
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceViewRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  percentageOff: {
    fontFamily: Fonts.type.black,
    color: '#b32546'
  },
  htmlView: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16)
  },
  featureView: {

  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#eee',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    fontFamily: Fonts.type.semibold,
  },
  quantity: {
    fontSize: 20,
    fontFamily: Fonts.type.semibold,
    marginHorizontal: moderateScale(10),
  },
  addToCartButton: {
    backgroundColor: '#b32546',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.type.bold,
  },
});

export default ProductDetailsScreen;
