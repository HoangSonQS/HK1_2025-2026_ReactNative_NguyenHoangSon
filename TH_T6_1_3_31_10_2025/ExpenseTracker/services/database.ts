import * as SQLite from 'expo-sqlite';

// Định nghĩa kiểu dữ liệu (giống Câu 2, thêm isDeleted cho Câu 5)
export interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: 'thu' | 'chi';
  isDeleted: number; // 0 = false, 1 = true
}

// Mở database
const db = SQLite.openDatabaseSync('expenses.db');

// Hàm khởi tạo bảng
export const initDB = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      createdAt TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('thu', 'chi')),
      isDeleted INTEGER DEFAULT 0
    );`
  );
  // Thêm cột isDeleted nếu bảng đã tồn tại (an toàn để chạy)
  try {
    await db.execAsync('ALTER TABLE expenses ADD COLUMN isDeleted INTEGER DEFAULT 0');
  } catch (e) {
    // Bỏ qua lỗi nếu cột đã tồn tại
  }
};

// (Câu 3b) Hàm thêm khoản chi mới
export const addExpense = async (title: string, amount: number, type: 'thu' | 'chi') => {
  const date = new Date().toLocaleDateString('vi-VN');
  const result = await db.runAsync(
    `INSERT INTO expenses (title, amount, createdAt, type) VALUES (?, ?, ?, ?);`,
    [title, amount, date, type]
  );
  return result;
};

// Hàm lấy tất cả khoản chi (chưa xóa)
export const getExpenses = async () => {
  const allRows: ExpenseItem[] = await db.getAllAsync<ExpenseItem>(
    `SELECT * FROM expenses WHERE isDeleted = 0 ORDER BY id DESC;`
  );
  return allRows;
};

export const getExpenseById = async (id: number) => {
  const row: ExpenseItem | null = await db.getFirstAsync<ExpenseItem>(
    `SELECT * FROM expenses WHERE id = ?;`,
    [id]
  );
  return row;
};

export const updateExpense = async (id: number, title: string, amount: number, type: 'thu' | 'chi') => {
  const result = await db.runAsync(
    `UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?;`,
    [title, amount, type, id]
  );
  return result;
};