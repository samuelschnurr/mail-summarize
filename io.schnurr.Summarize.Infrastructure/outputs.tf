output "webapp_default_hostname" {
  description = "Endpoint of the web app"
  value       = "https://${module.webapp.webapp_default_hostname}"
}

output "cognitive_endpoint" {
  description = "Endpoint of the cognitive service"
  value       = module.cognitiveservice.cognitive_endpoint
}

output "function_default_hostname" {
  description = "Endpoint of the function app"
  value       = "https://${module.cognitiveservice.function_default_hostname}"
}

output "keyvault_uri" {
  description = "Endpoint of the key vault"
  value       = module.cognitiveservice.keyvault_uri
}



