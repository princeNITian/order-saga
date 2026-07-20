import { CancelShipmentService } from "./service.js";
import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";

export const handler = async (event: any) => {
  try {

    const result =
      await CancelShipmentService.cancel(
        event.shipmentId
      );

    return success(result);

  } catch (error) {

    Logger.error("Cancel Shipment Failed", error);

    return failure("Cancel Shipment Failed");

  }
};