export type CategoryType = 'starters' | 'mains' | 'pasta_pizza' | 'desserts' | 'drinks' | 'all';

export interface MenuItem {
  id: string;
  name: string;
  persianName: string;
  category: 'starters' | 'mains' | 'pasta_pizza' | 'desserts' | 'drinks';
  price: number;
  priceFormatted: string;
  description: string;
  image: string;
  tags?: string[];
  isSpecial?: boolean;
  calories?: number;
  prepTime?: string;
  rating?: number;
  ingredients?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
  selectedOptions?: string[];
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'main' | 'vip' | 'terrace' | 'window';
  occasion?: string;
  specialRequests?: string;
  createdAt: string;
}

export type ActiveTab = 'home' | 'menu' | 'about' | 'gallery' | 'contact';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  vipTier: string;
  joinedDate: string;
}

