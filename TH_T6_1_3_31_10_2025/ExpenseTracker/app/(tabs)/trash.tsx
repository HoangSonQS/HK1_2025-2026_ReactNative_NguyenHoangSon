import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { getDeletedExpenses, ExpenseItem } from '../../services/database';

export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm tải các khoản đã xóa
  const loadDeletedExpenses = useCallback(async () => {
    try {
      const fetchedExpenses = await getDeletedExpenses();
      setDeletedExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Lỗi khi tải khoản đã xóa:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tải lại khi focus màn hình này
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadDeletedExpenses();
    }, [loadDeletedExpenses])
  );

  // Hàm render (gần giống màn hình chính)
  const renderItem = ({ item }: { item: ExpenseItem }) => (
    // Chúng ta sẽ thêm Pressable ở đây cho Câu 8 (Restore)
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
        data={deletedExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Thùng rác trống.</Text>}
      />
    </SafeAreaView>
  );
}

// Dùng chung style với màn hình index
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerCenter: {
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
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});