import { db } from './db';

export interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  drink_id: number;
  drink_name: string;
  drink_price: number;
  drink_image?: string;
  quantity: number;
  created_at: string;
}

export interface Drink {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

// Lưu đơn hàng mới
export const saveOrder = (totalAmount: number): number => {
  const result = db.runSync('INSERT INTO orders (total_amount, status) VALUES (?, ?)', [totalAmount, 'pending']);
  return result.lastInsertRowId;
};

// Lưu item vào đơn hàng
export const saveOrderItem = (
  orderId: number,
  drinkId: number,
  drinkName: string,
  drinkPrice: number,
  drinkImage: string | null,
  quantity: number
): void => {
  db.runSync(
    `INSERT INTO order_items 
     (order_id, drink_id, drink_name, drink_price, drink_image, quantity) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [orderId, drinkId, drinkName, drinkPrice, drinkImage, quantity]
  );
};

// Lấy tất cả đơn hàng
export const getAllOrders = (): Order[] => {
  const result = db.getAllSync('SELECT * FROM orders ORDER BY created_at DESC');
  return result as Order[];
};

// Lấy items của một đơn hàng
export const getOrderItems = (orderId: number): OrderItem[] => {
  const result = db.getAllSync('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
  return result as OrderItem[];
};

// Lưu drinks từ API
export const saveDrinks = (drinks: Drink[]): void => {
  // Xóa dữ liệu cũ
  db.runSync('DELETE FROM drinks');
  
  // Thêm dữ liệu mới
  drinks.forEach(drink => {
    db.runSync(
      `INSERT INTO drinks (id, name, price, image, description, category) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [drink.id, drink.name, drink.price, drink.image, drink.description, drink.category]
    );
  });
};

// Lấy drinks từ database
export const getDrinks = (): Drink[] => {
  const result = db.getAllSync('SELECT * FROM drinks ORDER BY name');
  return result as Drink[];
};

// Xóa đơn hàng
export const deleteOrder = (orderId: number): void => {
  db.runSync('DELETE FROM orders WHERE id = ?', [orderId]);
};
