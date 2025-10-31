import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('cafe_app.db');

export const initDatabase = () => {
  try {
    // Tạo bảng orders
    db.execSync(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tạo bảng order_items
    db.execSync(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        drink_id INTEGER NOT NULL,
        drink_name TEXT NOT NULL,
        drink_price REAL NOT NULL,
        drink_image TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
      );
    `);

    // Tạo bảng drinks để lưu cache từ API
    db.execSync(`
      CREATE TABLE IF NOT EXISTS drinks (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        description TEXT,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export { db };
