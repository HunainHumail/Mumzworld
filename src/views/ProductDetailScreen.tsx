import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { ProductDetails } from '../types';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const [isArabic, setIsArabic] = useState(true); // State to switch between languages
  const productDetails: ReadonlyArray<ProductDetails> = route.params;

  // Toggle between Arabic and English
  const toggleLanguage = () => {
    setIsArabic(prev => !prev);
  };

  // Determine which product details to show based on language
  const currentProductDetails = isArabic ? productDetails[0] : productDetails[1];

  return (
    <View>
      <Button title={`Switch to ${isArabic ? 'English' : 'Arabic'}`} onPress={toggleLanguage} />
      <View>
        <Text>Brand: {currentProductDetails.brand_info.title}</Text>
        <Text>Name: {currentProductDetails.name}</Text>
        <Text>Price: {currentProductDetails.price?.regularPrice.amount.value} {currentProductDetails.price?.regularPrice.amount.currency}</Text>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
