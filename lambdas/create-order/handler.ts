import { APIGatewayProxyEvent } from "aws-lambda";

import { Logger } from "../../shared/logger.js";
import { success, failure } from "../../shared/response.js";
import { CreateOrderService } from "./service.js";

export const handler = async (event: APIGatewayProxyEvent | any) => {
  try {
    // API Gateway
    if ("body" in event) {
      const body = JSON.parse(event.body ?? "{}");

      const order = await CreateOrderService.create(body);

      return success(order, 201);
    }

    // Step Functions
    return await CreateOrderService.create(event);

  } catch (error) {
    Logger.error("Create Order Failed", error);

    // API Gateway
    if ("body" in event) {
      return failure("Unable to create order");
    }

    // Step Functions
    throw error;
  }
};