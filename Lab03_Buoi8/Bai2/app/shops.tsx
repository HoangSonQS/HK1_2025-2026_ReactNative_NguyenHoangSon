import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

interface Shop {
  id: number;
  name: string;
  address: string;
  image?: string;
  status: 'accepting' | 'unavailable';
  statusText: string;
  waitTime: string;
  waitTimeColor: string;
}

const shops: Shop[] = [
  {
    id: 1,
    name: 'Kitanda Espresso & Acai-U District',
    address: '1121 NE 45 St',
    status: 'accepting',
    statusText: 'Accepting Orders',
    waitTime: '5-10 minutes',
    waitTimeColor: '#ff4444',
  },
  {
    id: 2,
    name: 'Jewel Box Cafe',
    address: '1145 GE 54 St',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300',
    status: 'unavailable',
    statusText: 'Temporary Unavailable',
    waitTime: '10-15 minutes',
    waitTimeColor: '#ff4444',
  },
  {
    id: 3,
    name: 'Javasti Cafe',
    address: '1167 GE 54 St',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300',
    status: 'unavailable',
    statusText: 'Temporary Unavailable',
    waitTime: '15-20 minutes',
    waitTimeColor: '#ff4444',
  },
  {
    id: 4,
    name: 'Nguyen Legend',
    address: '1200 GE 55 St',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300',
    status: 'accepting',
    statusText: 'Accepting Orders',
    waitTime: '5-10 minutes',
    waitTimeColor: '#ff4444',
  },
];

const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => {
  const router = useRouter();

  const getStatusIcon = () => {
    if (shop.status === 'accepting') {
      return '✓';
    } else {
      return '🔒';
    }
  };

  const getStatusColor = () => {
    return shop.status === 'accepting' ? '#4CAF50' : '#ff4444';
  };

  const handleShopPress = () => {
    if (shop.status === 'accepting') {
      router.push('/drinks');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.shopCard} 
      onPress={handleShopPress}
      disabled={shop.status !== 'accepting'}
    >
      <View style={styles.shopImageContainer}>
        {shop.image ? (
          <Image source={{ uri: shop.image }} style={styles.shopImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Shop Image</Text>
          </View>
        )}
      </View>
      
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Text style={[styles.statusIcon, { color: getStatusColor() }]}>
            {getStatusIcon()}
          </Text>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {shop.statusText}
          </Text>
        </View>
        
        <View style={styles.statusItem}>
          <Text style={styles.clockIcon}>🕐</Text>
          <Text style={[styles.waitTime, { color: shop.waitTimeColor }]}>
            {shop.waitTime}
          </Text>
        </View>
        
        <View style={styles.statusItem}>
          <Text style={styles.locationIcon}>📍</Text>
        </View>
      </View>
      
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.shopAddress}>{shop.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ShopsScreen() {
  const router = useRouter();

  const renderShop = ({ item }: { item: Shop }) => (
    <ShopCard shop={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shops Near Me</Text>
        <TouchableOpacity>
          <Text style={styles.searchButton}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    fontSize: 20,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  shopImageContainer: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  clockIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  waitTime: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationIcon: {
    fontSize: 14,
  },
  shopInfo: {
    padding: 16,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  shopAddress: {
    fontSize: 14,
    color: '#666',
  },
});
