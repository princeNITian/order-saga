import { RefundPaymentService } from "./service.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    return await RefundPaymentService.refund(event.paymentId);
  } catch (error) {
    Logger.error("Refund Payment Failed", error);

    throw error;
  }
};