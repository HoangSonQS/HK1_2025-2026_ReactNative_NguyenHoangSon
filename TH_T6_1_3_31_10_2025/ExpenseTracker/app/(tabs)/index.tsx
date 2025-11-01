import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, Link } from 'expo-router';
import {
  initDB,
  getExpenses,
  ExpenseItem,
  softDeleteExpense,
  searchExpenses,
} from '../../services/database';

// (Câu 10) Định nghĩa kiểu lọc
type FilterType = 'all' | 'thu' | 'chi';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // (Câu 6)
  const [isRefreshing, setIsRefreshing] = useState(false); // (Câu 7)
  const [filterType, setFilterType] = useState<FilterType>('all'); // (Câu 10)

  // Hàm tải dữ liệu (Kết hợp Câu 3, 6, 10)
  const loadExpenses = useCallback(async () => {
    // Chỉ bật spinner nếu là lần tải đầu (tránh giật khi gõ/lọc)
    if (searchQuery.trim() === '' && filterType === 'all') {
      setIsLoading(true);
    }

    try {
      await initDB();
      let fetchedExpenses;

      // Nếu có tìm kiếm, ưu tiên tìm kiếm
      if (searchQuery.trim() !== '') {
        fetchedExpenses = await searchExpenses(searchQuery, filterType);
      } else {
        // Nếu không, lọc bình thường
        fetchedExpenses = await getExpenses(filterType);
      }
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Lỗi khi tải expenses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filterType]); // Phụ thuộc vào cả tìm kiếm và lọc

  // Tải lại dữ liệu khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  // (Câu 7) Hàm xử lý "Kéo để làm mới"
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setSearchQuery(''); // Reset tìm kiếm
    setFilterType('all'); // Reset lọc
    // loadExpenses sẽ được gọi lại vì searchQuery/filterType thay đổi
    // nhưng chúng ta gọi trực tiếp để đảm bảo
    try {
      const fetchedExpenses = await getExpenses('all');
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Lỗi khi refresh:', error);
    }
    setIsRefreshing(false);
  }, []); // Không cần phụ thuộc

  // (Câu 5) Hàm xử lý "Chạm lâu" để Xóa
  const handleDeletePress = (id: number) => {
    Alert.alert(
      'Xác nhận Xóa',
      'Bạn có chắc muốn xóa khoản chi này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await softDeleteExpense(id);
              await loadExpenses(); // Tải lại danh sách
            } catch (error) {
              console.error('Lỗi khi xóa:', error);
            }
          },
        },
      ]
    );
  };

  // Hàm render mỗi item (Kết hợp Câu 2, 4, 5)
  const renderItem = ({ item }: { item: ExpenseItem }) => (
    <Link href={`/edit/${item.id}`} asChild>
      <Pressable onLongPress={() => handleDeletePress(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDate}>{item.createdAt}</Text>
          </View>
          <View>
            <Text
              style={[
                styles.itemAmount,
                item.type === 'thu' ? styles.thu : styles.chi,
              ]}
            >
              {item.type === 'thu' ? '+' : '-'}{' '}
              {item.amount.toLocaleString('vi-VN')} đ
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  // Hiển thị spinner khi tải
  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerCenter}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  // Giao diện chính
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* (Câu 6) Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên khoản chi..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* (Câu 10) Thanh Lọc */}
      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            filterType === 'all' && styles.filterActive,
          ]}
          onPress={() => setFilterType('all')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'all' && styles.filterTextActive,
            ]}
          >
            Tất cả
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filterType === 'thu' && styles.filterActive,
          ]}
          onPress={() => setFilterType('thu')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'thu' && styles.filterTextActive,
            ]}
          >
            Thu
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filterType === 'chi' && styles.filterActive,
          ]}
          onPress={() => setFilterType('chi')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'chi' && styles.filterTextActive,
            ]}
          >
            Chi
          </Text>
        </Pressable>
      </View>

      {/* Danh sách */}
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'Không tìm thấy kết quả.'
              : 'Chưa có khoản thu/chi nào.'}
          </Text>
        }
        // (Câu 7) Kéo để làm mới
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['blue']}
          />
        }
      />
    </SafeAreaView>
  );
}

// Toàn bộ styles
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'blue',
  },
  filterActive: {
    backgroundColor: 'blue',
  },
  filterText: {
    color: 'blue',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Tách biệt khỏi thanh tab
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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