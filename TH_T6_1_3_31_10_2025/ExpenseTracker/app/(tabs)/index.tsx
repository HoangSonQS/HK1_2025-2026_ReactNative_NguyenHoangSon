import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// Câu 1b: Import SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';

// (Câu 2) Định nghĩa kiểu dữ liệu cho một Khoản chi
export interface ExpenseItem {
  id: number;
  title: string;       // [cite: 15]
  amount: number;      // [cite: 16]
  createdAt: string;   // [cite: 17]
  type: 'thu' | 'chi'; // [cite: 18]
}

// Dữ liệu mẫu
const MOCK_DATA: ExpenseItem[] = [
  { id: 1, title: 'Tiền ăn trưa', amount: 50000, createdAt: '01/11/2025', type: 'chi' },
  { id: 2, title: 'Lương tháng 10', amount: 1000000, createdAt: '01/11/2025', type: 'thu' },
];

export default function HomeScreen() {

  // (Câu 2) Hàm render mỗi item
  const renderItem = ({ item }: { item: ExpenseItem }) => (
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

  return (
    // Câu 1b: Dùng SafeAreaView
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
});