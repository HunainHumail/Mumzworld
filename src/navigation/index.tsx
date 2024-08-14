import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native';
import ProductListScreen from '../views/ProductListScreen';
import ProductDetailsScreen from '../views/ProductDetailScreen';
import { Logo } from '../utils/svgs';
import NavigationService from '../utils/NavigationService';
import { ProductDetails } from '../types';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: ProductDetails[];
};

export type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#fef1f1', // Set the background color of the header
            },
            headerTitle: () => (
              // <Text style={{ color: '#333333', fontSize: 18 }}>Products</Text>
              <Logo width={190} height={40}/>

            ),
          }}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
