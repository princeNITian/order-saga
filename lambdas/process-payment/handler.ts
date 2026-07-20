import { ProcessPaymentService } from "./service.js";
import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {
    const payment = await ProcessPaymentService.process(event);

    return success(payment);
  } catch (error) {
    Logger.error("Payment Failed", error);

    return failure("Payment processing failed");
  }
};