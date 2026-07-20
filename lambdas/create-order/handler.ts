import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { success, failure } from "../../shared/response.js";
import { Logger } from "../../shared/logger.js";
import { CreateOrderService } from "./service.js";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body ?? "{}");

    const order = await CreateOrderService.create(body);

    return success(order, 201);
  } catch (error) {
    Logger.error("Create Order Failed", error);

    return failure("Unable to create order");
  }
};