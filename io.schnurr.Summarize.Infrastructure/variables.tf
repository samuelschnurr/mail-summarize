variable "AZURE_REGION" {
  description = "Azure region"
  type        = string
  default     = "westeurope"
}

variable "APPLICATION_NAME" {
  description = "Name of the application"
  type        = string
  default     = "mailsummarize"
}

variable "RESOURCE_GROUP_NAME" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-mailsummarize"
}

# These variables need to be set to instantiate the azure ressources
# Enter default values for local development but dont commit them to git
variable "SUBSCRIPTION_ID" {
  description = "Subscription ID of the Azure subscription"
  type        = string
}

variable "SP_CLIENT_ID" {
  description = "Service Principal Client ID"
  type        = string
}

variable "SP_CLIENT_SECRET" {
  description = "Service Principal Client Secret"
  type        = string
}

variable "SP_TENANT_ID" {
  description = "Service Principal Tenant ID"
  type        = string
}
