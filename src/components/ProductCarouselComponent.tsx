import React, { useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProductImage } from '../types';
import AnimatedPaginationDot from 'react-native-animated-pagination-dot';

interface ProductCarouselProps {
    mediaGallery: ProductImage[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ mediaGallery }) => {
    const { width } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const renderItem = ({ item }: { item: ProductImage }) => (
        <FastImage
            source={{ uri: item.url }}
            style={{ width: width, height: width * 0.75, borderRadius: 8 }}
            resizeMode={FastImage.resizeMode.contain}
        />
    );

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={mediaGallery}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <View style={styles.paginationContainer}>
                <AnimatedPaginationDot
                    activeDotColor="#b32546"
                    inactiveDotColor='#fd6b6b'
                    curPage={currentIndex}
                    maxPage={mediaGallery.length}
                    sizeRatio={1.5}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        marginTop: 10, // Adjust spacing between carousel and dots
        width: '100%',
        alignItems: 'center',
    },
});

export default ProductCarousel;
