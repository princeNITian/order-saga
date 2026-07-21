locals {
  project_name = var.project_name
  environment  = var.environment

  common_name = "${local.project_name}-${local.environment}"

  lambda_name_prefix = local.common_name

  orders_table_name = "${local.common_name}-orders"

  state_machine_name = "${local.common_name}-order-saga"

  common_tags = {
    Project     = local.project_name
    Environment = local.environment
    ManagedBy   = "Terraform"
  }
}