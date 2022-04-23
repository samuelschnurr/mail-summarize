resource "azurerm_storage_account" "mailsummarize_app" {
  name                     = "sta${var.APPLICATION_NAME}app"
  resource_group_name      = "rg-${var.APPLICATION_NAME}"
  location                 = var.AZURE_REGION
  account_tier             = "Standard"
  account_replication_type = "GRS"
  account_kind             = "StorageV2"

  identity {
    type = "SystemAssigned"
  }

  static_website {
    index_document = "taskpane.html"
  }
}
