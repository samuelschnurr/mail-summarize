terraform {
  required_version = ">= 1.1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.65"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-mailsummarize"
    storage_account_name = "stmailsummarizetfstate"
    container_name       = "tfstate"
    key                  = "state"
  }
}

provider "azurerm" {
  subscription_id = var.SUBSCRIPTION_ID
  client_id       = var.SP_CLIENT_ID
  client_secret   = var.SP_CLIENT_SECRET
  tenant_id       = var.SP_TENANT_ID
  features {}
}

module "webapp" {
  source           = "./modules/webapp"
  APPLICATION_NAME = var.APPLICATION_NAME
  AZURE_REGION     = var.AZURE_REGION
}

module "cognitiveservice" {
  source           = "./modules/cognitiveservice"
  APPLICATION_NAME = var.APPLICATION_NAME
  AZURE_REGION     = var.AZURE_REGION
}
