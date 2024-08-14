import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ShoppingCartOutlined, ShoppingCartFilled } from '../utils/svgs';

interface AnimatedCartProps {
  inCart: boolean;
  onToggleCart: (newValue: boolean) => void;
}

const AnimatedCartButton: React.FC<AnimatedCartProps> = ({ inCart, onToggleCart }) => {
  const cartScaleValue = useRef(new Animated.Value(1)).current;

  const toggleCart = () => {
    const newValue = !inCart;
    onToggleCart(newValue);

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

  return (
    <TouchableOpacity activeOpacity={1} style={styles.addToCartButton} onPress={toggleCart}>
      <Animated.View style={{ transform: [{ scale: cartScaleValue }] }}>
        {inCart ? <ShoppingCartFilled /> : <ShoppingCartOutlined />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#f4f4f6",
    backgroundColor: "#fbe6e8",
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedCartButton;
