import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useApp } from '../src/context/AppContext';
import { useRouter } from 'expo-router';
import { Drink } from '../src/services/api';

const DrinkItem: React.FC<{ drink: Drink }> = ({ drink }) => {
  const { addToCart, state } = useApp();
  
  const cartItem = state.cart.find(item => item.drink.id === drink.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(drink);
  };

  return (
    <View style={styles.drinkItem}>
      <View style={styles.drinkImageContainer}>
        {drink.image ? (
          <Image source={{ uri: drink.image }} style={styles.drinkImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      
      <View style={styles.drinkInfo}>
        <Text style={styles.drinkName}>{drink.name}</Text>
        <Text style={styles.drinkPrice}>${drink.price}</Text>
        {drink.description && (
          <Text style={styles.drinkDescription}>{drink.description}</Text>
        )}
      </View>
      
      <View style={styles.quantityControls}>
        {quantity > 0 && (
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DrinksScreen() {
  const { state, loadDrinks, getCartItemCount } = useApp();
  const router = useRouter();

  React.useEffect(() => {
    if (state.drinks.length === 0) {
      loadDrinks();
    }
  }, []);

  const renderDrink = ({ item }: { item: Drink }) => (
    <DrinkItem drink={item} />
  );

  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading drinks...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{state.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDrinks}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drinks</Text>
      </View>
      
      <FlatList
        data={state.drinks}
        renderItem={renderDrink}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.cartButton, getCartItemCount() === 0 && styles.disabledButton]} 
          onPress={() => router.push('/cart')}
          disabled={getCartItemCount() === 0}
        >
          <Text style={[styles.cartButtonText, getCartItemCount() === 0 && styles.disabledButtonText]}>
            GO TO CART {getCartItemCount() > 0 && `(${getCartItemCount()})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  drinkItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drinkImageContainer: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  drinkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
  },
  drinkInfo: {
    flex: 1,
  },
  drinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  drinkPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  drinkDescription: {
    fontSize: 14,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cartButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#999',
  },
});
