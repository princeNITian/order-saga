import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

import { db } from "../../shared/dynamodb.js";
import { TABLES, SHIPMENT_STATUS } from "../../shared/constants.js";
import { Logger } from "../../shared/logger.js";

interface CreateShipmentRequest {
  orderId: string;
}

export class CreateShipmentService {
  static async create(request: CreateShipmentRequest) {

    // Simulate shipment failure
    if (request.orderId.endsWith("FAIL")) {
      throw new Error("Shipment Service Unavailable");
    }

    const shipment = {
      shipmentId: `SHIP-${uuid()}`,
      orderId: request.orderId,
      status: SHIPMENT_STATUS.CREATED,
      createdAt: new Date().toISOString(),
    };

    await db.send(
      new PutCommand({
        TableName: TABLES.SHIPMENTS,
        Item: shipment,
      })
    );

    Logger.info("Shipment Created", shipment);

    return shipment;
  }
}