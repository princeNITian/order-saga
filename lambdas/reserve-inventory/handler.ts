import { ReserveInventoryService } from "./service.js";
import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    const result = await ReserveInventoryService.reserve(event);

    return success(result);
  } catch (error) {
    Logger.error("Reserve Inventory Failed", error);

    return failure("Inventory reservation failed");
  }
};