import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useApp } from '../src/context/AppContext';
import { useRouter } from 'expo-router';
import { Order, OrderItem } from '../src/database/orderRepo';
import { getOrderItems } from '../src/database/orderRepo';

const OrderItemComponent: React.FC<{ item: OrderItem }> = ({ item }) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.itemImageContainer}>
        {item.drink_image ? (
          <Image source={{ uri: item.drink_image }} style={styles.itemImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.drink_name}</Text>
        <Text style={styles.itemPrice}>${item.drink_price}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>
          ${(item.drink_price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const OrderCard: React.FC<{ order: Order; items: OrderItem[] }> = ({ order, items }) => {
  const totalAmount = items.reduce((sum, item) => sum + (item.drink_price * item.quantity), 0);
  
  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.orderStatus}>{order.status.toUpperCase()}</Text>
      </View>
      
      <View style={styles.orderItems}>
        {items.map((item) => (
          <OrderItemComponent key={item.id} item={item} />
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>Total: ${totalAmount.toFixed(2)}</Text>
        <Text style={styles.orderDate}>
          {new Date(order.created_at).toLocaleDateString()}
        </Text>
      </View>
      
      {order.status === 'pending' && (
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>PAY NOW</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function OrdersScreen() {
  const { state, loadOrders } = useApp();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = React.useState<{ [key: number]: OrderItem[] }>({});

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const loadOrderDetails = () => {
      const details: { [key: number]: OrderItem[] } = {};
      for (const order of state.orders) {
        try {
          const items = getOrderItems(order.id);
          details[order.id] = items;
        } catch (error) {
          console.error('Error loading order items:', error);
        }
      }
      setOrderDetails(details);
    };

    if (state.orders.length > 0) {
      loadOrderDetails();
    }
  }, [state.orders]);

  const renderOrder = ({ item }: { item: Order }) => (
    <OrderCard order={item} items={orderDetails[item.id] || []} />
  );

  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (state.orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySubtitle}>Start shopping to see your orders here!</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => router.push('/shops')}
        >
          <Text style={styles.browseButtonText}>Find Shops</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Orders</Text>
      </View>
      
      <FlatList
        data={state.orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.newOrderButton}
          onPress={() => router.push('/shops')}
        >
          <Text style={styles.newOrderButtonText}>New Order</Text>
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
    paddingBottom: 100, // Space for footer
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  itemTotal: {
    alignItems: 'flex-end',
  },
  itemTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  payButtonText: {
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
  newOrderButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  newOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
