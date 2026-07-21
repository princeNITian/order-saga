import { CreateShipmentService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await CreateShipmentService.create(event);
  } catch (error) {
    Logger.error("Shipment Creation Failed", error);

    throw error;
  }
};