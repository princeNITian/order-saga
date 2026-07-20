import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "../../shared/dynamodb.js";
import { TABLES, ORDER_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

export class CancelOrderService {
  static async cancel(orderId: string) {

    await db.send(
      new UpdateCommand({
        TableName: TABLES.ORDERS,
        Key: {
          orderId
        },
        UpdateExpression:
          "SET #status = :status",
        ExpressionAttributeNames: {
          "#status": "status"
        },
        ExpressionAttributeValues: {
          ":status": ORDER_STATUS.CANCELLED
        }
      })
    );

    Logger.info("Order Cancelled", { orderId });

    return {
      orderId,
      status: ORDER_STATUS.CANCELLED
    };
  }
}