############################################
# Create Order Lambda
############################################

resource "aws_lambda_function" "create_order" {

  function_name = "${local.common_name}-create-order"

  description = "Creates a new order"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/create-order.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/create-order.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = [
    "x86_64"
  ]

  environment {
    variables = {
      ORDERS_TABLE = aws_dynamodb_table.orders.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "cancel_order" {

  function_name = "${local.common_name}-cancel-order"

  description = "Cancel Order"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/cancel-order.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/cancel-order.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = [
    "x86_64"
  ]

  environment {
    variables = {
      ORDERS_TABLE = aws_dynamodb_table.orders.name
    }
  }

  tags = local.common_tags
}


resource "aws_lambda_function" "reserve_inventory" {

  function_name = "${local.common_name}-reserve-inventory"

  description = "Reserve Inventory"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/reserve-inventory.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/reserve-inventory.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      INVENTORY_TABLE = aws_dynamodb_table.inventory.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "release_inventory" {

  function_name = "${local.common_name}-release-inventory"

  description = "Release Inventory"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/release-inventory.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/release-inventory.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      INVENTORY_TABLE = aws_dynamodb_table.inventory.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "process_payment" {

  function_name = "${local.common_name}-process-payment"

  description = "Process Payment"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/process-payment.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/process-payment.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      PAYMENTS_TABLE = aws_dynamodb_table.payments.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "refund_payment" {

  function_name = "${local.common_name}-refund-payment"

  description = "Refund Payment"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/refund-payment.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/refund-payment.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      PAYMENTS_TABLE = aws_dynamodb_table.payments.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "create_shipment" {

  function_name = "${local.common_name}-create-shipment"

  description = "Create Shipment"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/create-shipment.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/create-shipment.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      SHIPMENTS_TABLE = aws_dynamodb_table.shipments.name
    }
  }

  tags = local.common_tags
}

resource "aws_lambda_function" "cancel_shipment" {

  function_name = "${local.common_name}-cancel-shipment"

  description = "Cancel Shipment"

  role = aws_iam_role.lambda_execution_role.arn

  runtime = var.lambda_runtime

  handler = "handler.handler"

  filename = "${path.module}/../../build/cancel-shipment.zip"

  source_code_hash = filebase64sha256("${path.module}/../../build/cancel-shipment.zip")

  memory_size = var.lambda_memory_size

  timeout = var.lambda_timeout

  architectures = ["x86_64"]

  environment {
    variables = {
      SHIPMENTS_TABLE = aws_dynamodb_table.shipments.name
    }
  }

  tags = local.common_tags
}

