import { ProcessPaymentService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await ProcessPaymentService.process(event);
  } catch (error) {
    Logger.error("Payment Failed", error);

    throw error;
  }
};