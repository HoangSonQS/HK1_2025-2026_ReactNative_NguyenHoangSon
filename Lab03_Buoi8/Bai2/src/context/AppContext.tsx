import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Drink } from '../services/api';
import { Order, OrderItem } from '../database/orderRepo';
import { fetchDrinks } from '../services/api';
import { saveDrinks, getDrinks, saveOrder, saveOrderItem, getAllOrders, getOrderItems } from '../database/orderRepo';
import { initDatabase } from '../database/db';

interface CartItem {
  drink: Drink;
  quantity: number;
}

interface AppState {
  drinks: Drink[];
  cart: CartItem[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DRINKS'; payload: Drink[] }
  | { type: 'ADD_TO_CART'; payload: Drink }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { drinkId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: AppState = {
  drinks: [],
  cart: [],
  orders: [],
  loading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DRINKS':
      return { ...state, drinks: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.drink.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.drink.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { drink: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.drink.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.drink.id === action.payload.drinkId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  addToCart: (drink: Drink) => void;
  removeFromCart: (drinkId: number) => void;
  updateCartQuantity: (drinkId: number, quantity: number) => void;
  clearCart: () => void;
  loadDrinks: () => Promise<void>;
  loadOrders: () => Promise<void>;
  createOrder: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize database and load data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await initDatabase();
        await loadDrinks();
        await loadOrders();
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize app' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeApp();
  }, []);

  const loadDrinks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const drinks = await fetchDrinks();
      saveDrinks(drinks);
      dispatch({ type: 'SET_DRINKS', payload: drinks });
    } catch (error) {
      // Fallback to local database if API fails
      try {
        const localDrinks = getDrinks();
        dispatch({ type: 'SET_DRINKS', payload: localDrinks });
      } catch (dbError) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load drinks' });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadOrders = async () => {
    try {
      const orders = getAllOrders();
      dispatch({ type: 'SET_ORDERS', payload: orders });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders' });
    }
  };

  const addToCart = (drink: Drink) => {
    dispatch({ type: 'ADD_TO_CART', payload: drink });
  };

  const removeFromCart = (drinkId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: drinkId });
  };

  const updateCartQuantity = (drinkId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(drinkId);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { drinkId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.drink.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const createOrder = async () => {
    try {
      if (state.cart.length === 0) {
        throw new Error('Cart is empty');
      }

      const totalAmount = getCartTotal();
      const orderId = saveOrder(totalAmount);

      // Save order items
      for (const cartItem of state.cart) {
        saveOrderItem(
          orderId,
          cartItem.drink.id,
          cartItem.drink.name,
          cartItem.drink.price,
          cartItem.drink.image || null,
          cartItem.quantity
        );
      }

      // Add order to state
      const newOrder: Order = {
        id: orderId,
        total_amount: totalAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create order' });
    }
  };

  const value: AppContextType = {
    state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    loadDrinks,
    loadOrders,
    createOrder,
    getCartTotal,
    getCartItemCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
