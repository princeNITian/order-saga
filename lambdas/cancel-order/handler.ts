import { CancelOrderService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await CancelOrderService.cancel(event.orderId);
  } catch (error) {
    Logger.error("Cancel Order Failed", error);

    throw error;
  }
};