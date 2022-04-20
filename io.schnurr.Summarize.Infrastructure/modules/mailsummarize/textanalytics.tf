resource "azurerm_cognitive_account" "ta" {
  name                = "ta-mailsummarize"
  location            = "westeurope"
  resource_group_name = "rg-mailsummarize"
  kind                = "TextAnalytics"

  sku_name = "F0"
}
