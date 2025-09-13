import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSumary';

export type Product = {
  id: number;
  name: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Áo Thun', price: 100000 },
  { id: 2, name: 'Quần Jeans', price: 250000 },
  { id: 3, name: 'Giày Sneaker', price: 500000 },
  { id: 4, name: 'Nón Lưỡi Trai', price: 80000 },
];

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CartSummary cart={cart} />
      <View style={{ flex: 1 }}>
        <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});