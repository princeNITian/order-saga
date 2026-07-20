import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

import { db } from "../../shared/dynamodb.js";
import { TABLES, PAYMENT_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

interface ProcessPaymentRequest {
  orderId: string;
  amount: number;
}

export class ProcessPaymentService {
  static async process(request: ProcessPaymentRequest) {

    // Simulate payment failure
    if (request.amount > 10000) {
      throw new Error("Payment Declined");
    }

    const payment = {
      paymentId: `PAY-${uuid()}`,
      orderId: request.orderId,
      amount: request.amount,
      status: PAYMENT_STATUS.SUCCESS,
      createdAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLES.PAYMENTS,
        Item: payment,
      })
    );

    Logger.info("Payment Successful", payment);

    return payment;
  }
}