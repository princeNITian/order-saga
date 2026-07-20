import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "../../shared/dynamodb.js";
import { TABLES } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

interface ReserveInventoryRequest {
  orderId: string;
  productId: string;
  quantity: number;
}

export class ReserveInventoryService {
  static async reserve(request: ReserveInventoryRequest) {
    const result = await db.send(
      new GetCommand({
        TableName: TABLES.INVENTORY,
        Key: {
          productId: request.productId,
        },
      })
    );

    if (!result.Item) {
      throw new Error("Product not found");
    }

    if (result.Item.stock < request.quantity) {
      throw new Error("Insufficient inventory");
    }

    const remainingStock = result.Item.stock - request.quantity;

    await db.send(
      new UpdateCommand({
        TableName: TABLES.INVENTORY,
        Key: {
          productId: request.productId,
        },
        UpdateExpression: "SET stock = :stock",
        ExpressionAttributeValues: {
          ":stock": remainingStock,
        },
      })
    );

    Logger.info("Inventory Reserved", {
      orderId: request.orderId,
      productId: request.productId,
      quantity: request.quantity,
    });

    return {
      orderId: request.orderId,
      productId: request.productId,
      reserved: request.quantity,
    };
  }
}