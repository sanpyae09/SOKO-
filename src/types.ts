export interface Product {
  id: number;
  image?: string;
  name: string;
  code: string;
  price: number;
  cost: number;
  stock: number;
}

export interface CartItem extends Product {
  qty: number;
}

export interface PaymentAccount {
  id: number;
  provider: string;
  name: string;
  number: string;
}

export interface Record {
  id: number;
  date: string;
  name: string;
  code: string;
  productName: string;
  cartItems?: CartItem[];
  city: string;
  quantity: number;
  amount: number;
  received: number;
  change: number;
  balance: number;
  profit: number;
  needsDelivery: boolean;
  customerPhone?: string;
  deliveryAddress?: string;
  deliveryStatus: 'pending' | 'delivered' | 'n/a';
  remark?: string;
  paymentMethod: string;
  paidDate?: string | null;
}

export interface ShopInfo {
  name: string;
  phone: string;
  address: string;
}
