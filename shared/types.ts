export interface Order {
  orderId: string;
  customerId: string;
  productId: string;
  quantity: number;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Payment {
  paymentId: string;
  orderId: string;
  amount: number;
  status: string;
}

export interface Shipment {
  shipmentId: string;
  orderId: string;
  status: string;
}

export interface Inventory {
  productId: string;
  stock: number;
}