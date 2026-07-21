import { CancelShipmentService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await CancelShipmentService.cancel(event.shipmentId);
  } catch (error) {
    Logger.error("Cancel Shipment Failed", error);

    throw error;
  }
};