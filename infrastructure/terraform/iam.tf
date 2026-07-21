############################################
# Lambda Assume Role Policy
############################################

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    sid    = "LambdaAssumeRole"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}

############################################
# Lambda Execution Role
############################################

resource "aws_iam_role" "lambda_execution_role" {
  name = "${local.common_name}-lambda-role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = local.common_tags
}

############################################
# Lambda Permissions
############################################

data "aws_iam_policy_document" "lambda_policy" {

  ##########################################
  # CloudWatch Logs
  ##########################################

  statement {
    sid    = "CloudWatchLogs"
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = ["*"]
  }

  ##########################################
  # DynamoDB
  ##########################################

  statement {
    sid    = "OrdersTableAccess"
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]

    resources = [
      aws_dynamodb_table.orders.arn,
      aws_dynamodb_table.inventory.arn,
      aws_dynamodb_table.payments.arn,
      aws_dynamodb_table.shipments.arn
    ]
  }
}

############################################
# IAM Policy
############################################

resource "aws_iam_policy" "lambda_policy" {
  name = "${local.common_name}-lambda-policy"

  policy = data.aws_iam_policy_document.lambda_policy.json

  tags = local.common_tags
}

############################################
# Attach Policy
############################################

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

