export interface Drink {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

// Mock API - trong thực tế sẽ gọi API thật
export const fetchDrinks = async (): Promise<Drink[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data dựa trên hình ảnh bạn cung cấp
  return [
    {
      id: 1,
      name: 'Milk',
      price: 20,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
      description: 'Fresh milk',
      category: 'Dairy'
    },
    {
      id: 2,
      name: 'Origin',
      price: 68,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
      description: 'Premium coffee origin',
      category: 'Coffee'
    },
    {
      id: 3,
      name: 'Salt',
      price: 5,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      description: 'Sea salt',
      category: 'Seasoning'
    },
    {
      id: 4,
      name: 'Espresso',
      price: 9,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300',
      description: 'Strong espresso coffee',
      category: 'Coffee'
    },
    {
      id: 5,
      name: 'Cappuccino',
      price: 23,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300',
      description: 'Creamy cappuccino',
      category: 'Coffee'
    },
    {
      id: 6,
      name: 'Weasel',
      price: 20,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300',
      description: 'Kopi Luwak coffee',
      category: 'Coffee'
    },
    {
      id: 7,
      name: 'Culi',
      price: 0,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300',
      description: 'Free sample',
      category: 'Coffee'
    },
    {
      id: 8,
      name: 'Catimor',
      price: 9,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300',
      description: 'Catimor coffee beans',
      category: 'Coffee'
    }
  ];
};

// Trong thực tế, bạn sẽ thay thế bằng API call thật:
/*
export const fetchDrinks = async (): Promise<Drink[]> => {
  try {
    const response = await fetch('https://your-api-endpoint.com/drinks');
    if (!response.ok) {
      throw new Error('Failed to fetch drinks');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching drinks:', error);
    throw error;
  }
};
*/
