import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import useProductDetailsViewModel from '../viewmodels/ProductDetailsViewModal';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const { productDetails, loading } = useProductDetailsViewModel(productId);

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{productDetails?.name}</Text>
          <Text>{productDetails?.price}</Text>
          <Text>{productDetails?.description}</Text>
        </>
      )}
    </View>
  );
};

export default ProductDetailsScreen;
