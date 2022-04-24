Install AzureCLI
    - v2.33.1
    - https://azcliprod.blob.core.windows.net/msi/azure-cli-2.33.1.msi
    - Install Guide https://aka.ms/installazurecliwindows
  
Install Terraform
    - v1.1.6
    - https://releases.hashicorp.com/terraform/1.1.6/
    - Install Guide https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/azure-get-started
    
Setup Infrastructure
    - Change names to your own names (state and variables.tf)
    - Then do  "az login" with your azure Account
    - Setup rg "rg-mailsummarize" and blob "stmailsummarizetfstate" and container "tfstate" 
        - alternativley use local state or something.
        - Change here: 
          -   backend "azurerm" {
                resource_group_name  = "rg-mailsummarize"
                storage_account_name = "stmailsummarizetfstate"
                container_name       = "tfstate"
                key                  = "state"
              }
              and variables.tf:
                    variable "APPLICATION_NAME" {
                        description = "Name of the application"
                        type        = string
                        default     = "mailsummarize"
                    }

    - Infrastructur Projekt:
        - terraform init
        - terraform apply
    - > All Resources are created


Keep after success the output - it needs to be used in function and web app:

    app_storage_endpoint = "https://stamailsummarizeapp.z6.web.core.windows.net/"
    cognitive_endpoint = "https://westeurope.api.cognitive.microsoft.com/"
    function_default_hostname = "https://fa-mailsummarize.azurewebsites.net"
    keyvault_uri = "https://kv-mailsummarize.vault.azure.net/"