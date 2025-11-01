import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, Link } from 'expo-router'; 
import { initDB, getExpenses, ExpenseItem } from '../../services/database'; 

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    try {
      await initDB(); 
      const fetchedExpenses = await getExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Lỗi khi tải expenses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadExpenses();
    }, [loadExpenses])
  );

  // (Câu 2) Hàm render mỗi item
  const renderItem = ({ item }: { item: ExpenseItem }) => (
    // (Câu 4a) Bọc item trong Link, trỏ đến /edit/[id]
    <Link href={`/edit/${item.id}`} asChild>
      <Pressable>
        <View style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDate}>{item.createdAt}</Text>
          </View>
          <View>
            <Text 
              style={[
                styles.itemAmount,
                item.type === 'thu' ? styles.thu : styles.chi
              ]}
            >
              {item.type === 'thu' ? '+' : '-'} {item.amount.toLocaleString('vi-VN')} đ
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có khoản thu/chi nào.</Text>}
      />
    </SafeAreaView>
  );
}

// Thêm 2 style này
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerCenter: { // Mới
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thu: {
    color: 'green',
  },
  chi: {
    color: 'red',
  },
  emptyText: { // Mới
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});