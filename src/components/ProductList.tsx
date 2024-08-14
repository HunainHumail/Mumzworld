import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ProductItem from './ProductItem';
import { Product } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import { screenHeight } from '../utils/constants';
import SearchBarComponent from './SearchBar';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SortIcon } from '../utils/svgs';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize filtered products to avoid unnecessary re-renders
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem product={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <SearchBarComponent value={searchQuery} onChangeText={setSearchQuery} />
        <TouchableOpacity style={styles.sortButton}>
          <SortIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        numColumns={2}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', padding: 5, paddingHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    padding: moderateScale(10),
    backgroundColor: '#f4f4f6'
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10)
  },
  sortButton: {
    backgroundColor: "#b32546",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10
  }
});

export default ProductList;
