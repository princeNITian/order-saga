output "orders_table_name" {
  description = "Orders DynamoDB table name"

  value = aws_dynamodb_table.orders.name
}

output "orders_table_arn" {
  description = "Orders DynamoDB table ARN"

  value = aws_dynamodb_table.orders.arn
}

output "lambda_function_name" {
  description = "Create Order Lambda name"

  value = aws_lambda_function.create_order.function_name
}

output "lambda_function_arn" {
  description = "Create Order Lambda ARN"

  value = aws_lambda_function.create_order.arn
}

output "lambda_role_arn" {
  description = "Lambda execution role ARN"

  value = aws_iam_role.lambda_execution_role.arn
}