import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

import { db } from "../../shared/dynamodb.js";
import { TABLES, ORDER_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";
import { Order } from "../../shared/types.js";

interface CreateOrderRequest {
  customerId: string;
  productId: string;
  quantity: number;
  amount: number;
}

export class CreateOrderService {
  static async create(request: CreateOrderRequest) {
    const order: Order = {
      orderId: `ORD-${uuid()}`,
      customerId: request.customerId,
      productId: request.productId,
      quantity: request.quantity,
      amount: request.amount,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLES.ORDERS,
        Item: order,
      })
    );

    Logger.info("Order created", order);

    return order;
  }
}