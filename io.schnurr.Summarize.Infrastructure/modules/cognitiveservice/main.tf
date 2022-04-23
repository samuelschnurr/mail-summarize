# Key Vault

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "mailsummarize" {
  name                        = "kv-${var.APPLICATION_NAME}"
  location                    = var.AZURE_REGION
  resource_group_name         = "rg-${var.APPLICATION_NAME}"
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get",
      "List"
    ]
  }
}

# Text Analytics
resource "azurerm_cognitive_account" "mailsummarize" {
  name                = "cog-${var.APPLICATION_NAME}"
  location            = var.AZURE_REGION
  resource_group_name = "rg-${var.APPLICATION_NAME}"
  kind                = "TextAnalytics"
  sku_name            = "F0"
}

# Function App
resource "azurerm_storage_account" "mailsummarize" {
  name                     = "sta${var.APPLICATION_NAME}api"
  resource_group_name      = "rg-${var.APPLICATION_NAME}"
  location                 = var.AZURE_REGION
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "mailsummarize" {
  name                = "plan-${var.APPLICATION_NAME}"
  resource_group_name = "rg-${var.APPLICATION_NAME}"
  location            = var.AZURE_REGION

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_function_app" "mailsummarize" {
  name                       = "fa-${var.APPLICATION_NAME}"
  resource_group_name        = "rg-${var.APPLICATION_NAME}"
  location                   = var.AZURE_REGION
  app_service_plan_id        = azurerm_app_service_plan.mailsummarize.id
  storage_account_name       = azurerm_storage_account.mailsummarize.name
  storage_account_access_key = azurerm_storage_account.mailsummarize.primary_access_key
}
