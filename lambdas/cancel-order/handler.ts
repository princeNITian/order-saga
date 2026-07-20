import { CancelOrderService } from "./service.js";
import { success, failure } from "../../shared/response.js";

export const handler = async (event: any) => {
  try {

    const result =
      await CancelOrderService.cancel(
        event.orderId
      );

    return success(result);

  } catch {

    return failure("Cancel Order Failed");

  }
};