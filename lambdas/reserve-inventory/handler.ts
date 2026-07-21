import { ReserveInventoryService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await ReserveInventoryService.reserve(event);
  } catch (error) {
    Logger.error("Reserve Inventory Failed", error);
    throw error;
  }
};