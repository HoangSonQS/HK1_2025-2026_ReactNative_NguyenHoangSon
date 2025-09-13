import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../App';

type Props = {
  cart: Product[];
};

const CartSummary: React.FC<Props> = ({ cart }) => {
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {totalItems} sản phẩm | Tổng tiền: {totalPrice.toLocaleString()} đ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#dff9fb',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#130f40',
  },
});

export default CartSummary;