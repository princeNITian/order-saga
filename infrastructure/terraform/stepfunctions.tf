data "aws_iam_policy_document" "step_functions_assume_role" {

  statement {

    sid = "StepFunctionsAssumeRole"

    effect = "Allow"

    principals {
      type = "Service"

      identifiers = [
        "states.amazonaws.com"
      ]
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}

resource "aws_iam_role" "step_functions_role" {

  name = "${local.common_name}-step-functions-role"

  assume_role_policy = data.aws_iam_policy_document.step_functions_assume_role.json

  tags = local.common_tags
}

data "aws_iam_policy_document" "step_functions_policy" {

  statement {

    sid = "InvokeLambda"

    effect = "Allow"

    actions = [
      "lambda:InvokeFunction"
    ]

    resources = [

      aws_lambda_function.create_order.arn,

      aws_lambda_function.cancel_order.arn,

      aws_lambda_function.reserve_inventory.arn,

      aws_lambda_function.release_inventory.arn,

      aws_lambda_function.process_payment.arn,

      aws_lambda_function.refund_payment.arn,

      aws_lambda_function.create_shipment.arn,

      aws_lambda_function.cancel_shipment.arn

    ]
  }
}

resource "aws_iam_policy" "step_functions_policy" {

  name = "${local.common_name}-step-functions-policy"

  policy = data.aws_iam_policy_document.step_functions_policy.json

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "step_functions_policy_attachment" {

  role = aws_iam_role.step_functions_role.name

  policy_arn = aws_iam_policy.step_functions_policy.arn
}

resource "aws_sfn_state_machine" "order_saga" {

  name = local.state_machine_name

  role_arn = aws_iam_role.step_functions_role.arn

  definition = templatefile(
    "${path.module}/statemachine.asl.json",
    {

      create_order_lambda_arn = aws_lambda_function.create_order.arn

      cancel_order_lambda_arn = aws_lambda_function.cancel_order.arn

      reserve_inventory_lambda_arn = aws_lambda_function.reserve_inventory.arn

      release_inventory_lambda_arn = aws_lambda_function.release_inventory.arn

      process_payment_lambda_arn = aws_lambda_function.process_payment.arn

      refund_payment_lambda_arn = aws_lambda_function.refund_payment.arn

      create_shipment_lambda_arn = aws_lambda_function.create_shipment.arn

      cancel_shipment_lambda_arn = aws_lambda_function.cancel_shipment.arn
    }
  )

  tags = local.common_tags
}