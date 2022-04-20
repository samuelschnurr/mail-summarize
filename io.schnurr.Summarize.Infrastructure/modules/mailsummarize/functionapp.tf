resource "azurerm_storage_account" "sta" {
  name                     = "stasummarizeapi"
  resource_group_name      = "rg-mailsummarize"
  location                 = "westeurope"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "plan" {
  name                = "plan-summarize"
  resource_group_name = "rg-mailsummarize"
  location            = "westeurope"

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_function_app" "fa" {
  name                       = "fa-summarize"
  resource_group_name        = "rg-mailsummarize"
  location                   = "westeurope"
  app_service_plan_id        = azurerm_app_service_plan.plan.id
  storage_account_name       = azurerm_storage_account.sta.name
  storage_account_access_key = azurerm_storage_account.sta.primary_access_key
}
