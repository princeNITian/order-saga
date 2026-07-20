import { RefundPaymentService } from "./service.js";
import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {

    const result =
      await RefundPaymentService.refund(
        event.paymentId
      );

    return success(result);

  } catch (error) {

    Logger.error("Refund Payment Failed", error);

    return failure("Refund Payment Failed");

  }
};