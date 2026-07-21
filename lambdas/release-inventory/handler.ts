import { ReleaseInventoryService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await ReleaseInventoryService.release(event);
  } catch (error) {
    Logger.error("Release Inventory Failed", error);

    throw error;
  }
};