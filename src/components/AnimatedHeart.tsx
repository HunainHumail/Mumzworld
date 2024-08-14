import React, { useRef, useState } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';
import { HeartOutlined, HeartFilled } from '../utils/svgs';

interface AnimatedHeartProps {
  isFavorite: boolean;
  onToggleFavorite: (newValue: boolean) => void;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ isFavorite, onToggleFavorite }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkles = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

  const toggleFavorite = () => {
    const newValue = !isFavorite;
    onToggleFavorite(newValue);

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
        outputRange: [0, Math.cos(angle) * 20],
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
              opacity: sparkle,
            },
          ]}
        />
      );
    });
  };

  return (
    <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </Animated.View>
      {isFavorite && renderSparkles()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartButton: {
    position: 'absolute',
    borderRadius: 50,
    zIndex: 10,
    padding: 10,
    right: 0,
  },
  sparkle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
});

export default AnimatedHeart;
