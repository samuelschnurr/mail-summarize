resource "azurerm_static_site" "mailsummarize" {
  name                = "stapp-${var.APPLICATION_NAME}"
  resource_group_name = "rg-${var.APPLICATION_NAME}"
  location            = var.AZURE_REGION
}
