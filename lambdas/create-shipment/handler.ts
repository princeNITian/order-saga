import { CreateShipmentService } from "./service.js";
import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    const shipment = await CreateShipmentService.create(event);

    return success(shipment);
  } catch (error) {
    Logger.error("Shipment Creation Failed", error);

    return failure("Shipment creation failed");
  }
};