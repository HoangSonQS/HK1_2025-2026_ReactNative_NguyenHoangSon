import React from 'react';
import { FlatList } from 'react-native';
import ProductItem from './ProductItem.tsx';
import { Product } from '../App';

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const ProductList: React.FC<Props> = ({ products, onAddToCart }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ProductItem product={item} onAddToCart={onAddToCart} />
      )}
    />
  );
};

export default ProductList;