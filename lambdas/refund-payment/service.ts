import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "../../shared/dynamodb.js";
import { TABLES, PAYMENT_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

export class RefundPaymentService {
  static async refund(paymentId: string) {

    await db.send(
      new UpdateCommand({
        TableName: TABLES.PAYMENTS,
        Key: {
          paymentId,
        },
        UpdateExpression:
          "SET #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": PAYMENT_STATUS.REFUNDED,
        },
      })
    );

    Logger.info("Payment Refunded", {
      paymentId,
    });

    return {
      paymentId,
      status: PAYMENT_STATUS.REFUNDED,
    };
  }
}