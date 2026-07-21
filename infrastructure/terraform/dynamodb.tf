resource "aws_dynamodb_table" "orders" {
  name         = local.orders_table_name
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  deletion_protection_enabled = false

  tags = local.common_tags
}

resource "aws_dynamodb_table" "inventory" {
  name         = "${local.common_name}-inventory"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "productId"

  attribute {
    name = "productId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  deletion_protection_enabled = false

  tags = local.common_tags
}

resource "aws_dynamodb_table" "payments" {
  name         = "${local.common_name}-payments"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "paymentId"

  attribute {
    name = "paymentId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  deletion_protection_enabled = false

  tags = local.common_tags
}

resource "aws_dynamodb_table" "shipments" {
  name         = "${local.common_name}-shipments"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "shipmentId"

  attribute {
    name = "shipmentId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  deletion_protection_enabled = false

  tags = local.common_tags
}