export const TABLES = {
  ORDERS: process.env.ORDERS_TABLE || "Orders",
  INVENTORY: process.env.INVENTORY_TABLE || "Inventory",
  PAYMENTS: process.env.PAYMENTS_TABLE ||"Payments",
  SHIPMENTS: process.env.SHIPMENTS_TABLE ||"Shipments",
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