resource "azurerm_static_site" "stapp" {
  name                = "stapp-mailsummarize"
  resource_group_name = "rg-mailsummarize"
  location            = "westeurope"
}
