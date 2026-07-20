export const TABLES = {
  ORDERS: "Orders",
  INVENTORY: "Inventory",
  PAYMENTS: "Payments",
  SHIPMENTS: "Shipments",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
} as const;

export const PAYMENT_STATUS = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export const SHIPMENT_STATUS = {
  CREATED: "CREATED",
  CANCELLED: "CANCELLED",
} as const;