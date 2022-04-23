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
}

resource "azurerm_key_vault_access_policy" "mailsummarize_local" {
  # Enables access from localhost with az login
  key_vault_id = azurerm_key_vault.mailsummarize.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete",
    "Purge",
  ]
}

resource "azurerm_key_vault_access_policy" "mailsummarize_function" {
  # Access from function app when deployed
  key_vault_id = azurerm_key_vault.mailsummarize.id
  tenant_id    = azurerm_function_app.mailsummarize.identity[0].tenant_id
  object_id    = azurerm_function_app.mailsummarize.identity[0].principal_id

  secret_permissions = [
    "Get",
    "List"
  ]
}

resource "azurerm_key_vault_secret" "cognitive_account_mailsummarize_endpoint" {
  name         = "cognitive-account-endpoint"
  value        = azurerm_cognitive_account.mailsummarize.endpoint
  key_vault_id = azurerm_key_vault.mailsummarize.id
}

resource "azurerm_key_vault_secret" "cognitive_account_mailsummarize_secret" {
  name         = "cognitive-account-secret"
  value        = azurerm_cognitive_account.mailsummarize.primary_access_key
  key_vault_id = azurerm_key_vault.mailsummarize.id
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
resource "azurerm_storage_account" "mailsummarize_api" {
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
  storage_account_name       = azurerm_storage_account.mailsummarize_api.name
  storage_account_access_key = azurerm_storage_account.mailsummarize_api.primary_access_key
  version                    = "~3"

  site_config {
    always_on = true
    cors {
      allowed_origins = ["*"]
    }
  }

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE" = "1",
    "KeyVaultEndpoint"         = azurerm_key_vault.mailsummarize.vault_uri
  }

  lifecycle {
    ignore_changes = [
      # Prevent Terraform reporting configuration drift after app code is deployed
      app_settings["WEBSITE_RUN_FROM_PACKAGE"],
    ]
  }
}
