import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "../../shared/dynamodb.js";
import { TABLES } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

interface ReleaseInventoryRequest {
  orderId: string;
  productId: string;
  quantity: number;
}

export class ReleaseInventoryService {
  static async release(request: ReleaseInventoryRequest) {

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

    const updatedStock =
      result.Item.stock + request.quantity;

    await db.send(
      new UpdateCommand({
        TableName: TABLES.INVENTORY,
        Key: {
          productId: request.productId,
        },
        UpdateExpression:
          "SET stock = :stock",
        ExpressionAttributeValues: {
          ":stock": updatedStock,
        },
      })
    );

    Logger.info("Inventory Released", {
      orderId: request.orderId,
      productId: request.productId,
      quantity: request.quantity,
    });

    return {
      productId: request.productId,
      availableStock: updatedStock,
    };
  }
}