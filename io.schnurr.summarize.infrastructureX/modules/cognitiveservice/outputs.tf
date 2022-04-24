output "cognitive_endpoint" {
  value = azurerm_cognitive_account.mailsummarize.endpoint
}

output "function_default_hostname" {
  value = azurerm_function_app.mailsummarize.default_hostname
}

output "keyvault_uri" {
  value = azurerm_key_vault.mailsummarize.vault_uri
}
