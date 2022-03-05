resource "azurerm_storage_account" "mailsummarizeTest" {
  name                     = "stmailsummarizetest"
  resource_group_name      = var.RESOURCE_GROUP_NAME
  location                 = var.AZURE_REGION
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
