import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "../../shared/dynamodb.js";
import { TABLES, SHIPMENT_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

export class CancelShipmentService {
  static async cancel(shipmentId: string) {

    await db.send(
      new UpdateCommand({
        TableName: TABLES.SHIPMENTS,
        Key: {
          shipmentId,
        },
        UpdateExpression:
          "SET #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": SHIPMENT_STATUS.CANCELLED,
        },
      })
    );

    Logger.info("Shipment Cancelled", {
      shipmentId,
    });

    return {
      shipmentId,
      status: SHIPMENT_STATUS.CANCELLED,
    };
  }
}