# Mail Summarize Infrastructure

This project represents the azure infrastructure for the Mail Summarize Outlook Add-In <a href="https://github.com/samuelschnurr/mail-summarize#mail-summarize-outlook-addin">Mail Summarize</a>. 

- Azure Infrastructure
- Infrastructure as Code with Terraform

## Before you start
- Install the <a href="https://azcliprod.blob.core.windows.net/msi/azure-cli-2.33.1.msi">Azure Cli</a>
- Install <a href="https://releases.hashicorp.com/terraform/1.1.6/">Terraform</a>
- Setup an Azure Account

## Build and run

Before the infrastructure can be set up with Terraform, a few steps must be taken in advance.

- Open `variables.tf` at root level and change the value to your custom names
- Login into your azure account with `az login`
- Setup an azure resource group with the name `rg-mailsummarize`
  - Inside the resource group create a blob storage with the name `stmailsummarizetfstate`
  - Inside the blob storage create a container with the name `tfstate`
 
As an alternative to the manual setup of the resources you can change the terraform azure backend (`azurerm`) to a local or other backend. For this way change the block `backend "azurerm" { [...] }` in the root `main.tf`.

## Deploy

To deploy the infrastructure to azure be sure you did the `Build and run` setup before. If you are ready you can just execute the common terraform commands to get a full operational infrastrucutre.

```
terraform init
terraform apply
```

After the successful setup you receive output variables which you should cache for the further setup of the other projects.

```
app_storage_endpoint = "<uri for your blob storage>"
cognitive_endpoint = "<uri for the cognitive services"
function_default_hostname = "<uri for the function>"
keyvault_uri = "<uri for the key vaule>"
```

## License

Get more information about the licensing of this repository at the <a href="https://github.com/samuelschnurr/mail-summarize#license">root level</a>.
