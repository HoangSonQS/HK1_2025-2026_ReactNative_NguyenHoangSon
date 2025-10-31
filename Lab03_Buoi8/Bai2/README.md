# Cafe App - React Native với Expo Router và SQLite

Ứng dụng quản lý cafe được xây dựng với React Native, Expo Router, và SQLite để lưu trữ dữ liệu đơn hàng cục bộ.

## Tính năng

- **Danh sách thức uống**: Hiển thị danh sách các loại thức uống từ API
- **Giỏ hàng**: Thêm/sửa/xóa sản phẩm trong giỏ hàng
- **Quản lý đơn hàng**: Lưu trữ đơn hàng trong SQLite database
- **Navigation**: Điều hướng giữa các màn hình với Expo Router

## Cấu trúc dự án

```
Bai2/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout với AppProvider
│   ├── index.tsx          # Màn hình chính
│   ├── drinks.tsx         # Màn hình danh sách thức uống
│   ├── cart.tsx           # Màn hình giỏ hàng
│   └── orders.tsx         # Màn hình đơn hàng
├── src/
│   ├── context/
│   │   └── AppContext.tsx  # Context quản lý state toàn cục
│   ├── database/
│   │   ├── db.ts          # Khởi tạo SQLite database
│   │   └── orderRepo.ts   # Repository cho orders và drinks
│   └── services/
│       └── api.ts         # API service (mock data)
└── package.json
```

## Cài đặt và chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

3. **Chạy trên thiết bị:**
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Database Schema

### Bảng `orders`
- `id`: Primary key
- `total_amount`: Tổng tiền đơn hàng
- `status`: Trạng thái đơn hàng (pending, completed, cancelled)
- `created_at`: Thời gian tạo
- `updated_at`: Thời gian cập nhật

### Bảng `order_items`
- `id`: Primary key
- `order_id`: Foreign key đến orders
- `drink_id`: ID thức uống
- `drink_name`: Tên thức uống
- `drink_price`: Giá thức uống
- `drink_image`: Hình ảnh thức uống
- `quantity`: Số lượng

### Bảng `drinks`
- `id`: Primary key
- `name`: Tên thức uống
- `price`: Giá
- `image`: URL hình ảnh
- `description`: Mô tả
- `category`: Danh mục

## API Integration

Hiện tại sử dụng mock data trong `src/services/api.ts`. Để tích hợp API thật:

1. Thay thế function `fetchDrinks()` trong `api.ts`
2. Cập nhật interface `Drink` nếu cần
3. Xử lý error handling và loading states

## Tính năng chính

### 1. Màn hình chính (index.tsx)
- Welcome screen với navigation buttons
- Hiển thị số lượng items trong giỏ hàng

### 2. Màn hình thức uống (drinks.tsx)
- Hiển thị danh sách thức uống từ API
- Thêm sản phẩm vào giỏ hàng
- Loading và error states

### 3. Màn hình giỏ hàng (cart.tsx)
- Hiển thị items trong giỏ hàng
- Thay đổi số lượng
- Xóa items
- Checkout và tạo đơn hàng

### 4. Màn hình đơn hàng (orders.tsx)
- Hiển thị lịch sử đơn hàng
- Chi tiết từng đơn hàng
- Trạng thái đơn hàng

## State Management

Sử dụng React Context API với useReducer để quản lý state:

- **Drinks**: Danh sách thức uống từ API
- **Cart**: Giỏ hàng hiện tại
- **Orders**: Lịch sử đơn hàng
- **Loading/Error states**

## Dependencies chính

- `expo-router`: Navigation
- `expo-sqlite`: Database
- `react-native`: Core framework
- `@expo/vector-icons`: Icons

## Lưu ý

- Database được khởi tạo tự động khi app start
- Dữ liệu được cache trong SQLite để offline access
- Mock API có thể thay thế bằng API thật
- UI được thiết kế responsive cho mobile