output "app_storage_endpoint" {
  value = azurerm_storage_account.mailsummarize_app.primary_blob_endpoint
}
