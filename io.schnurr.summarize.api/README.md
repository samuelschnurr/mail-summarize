Install AzureCLI
    - v2.33.1
    - https://azcliprod.blob.core.windows.net/msi/azure-cli-2.33.1.msi
    - Install Guide https://aka.ms/installazurecliwindows

Install dotnet 5.0 (Required for https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker)
Install dotnet core 3.1 (Required for run Azure Functions in RUntime 3.x (https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-class-library?tabs=v2%2Ccmd#supported-versions))

Install nodejs
npm i -g azure-functions-core-tools@3 --unsafe-perm true

Setup local development (api project):
    - Then do  "az login" with your azure Account
    - in api project: dotnet build
    - in local.settings.json set "KeyVaultEndpoint" with the value of terraform output after created "keyvault_uri"
    - execute "func host start"
    - if execution fails with error "Script is not digitally signed. You cannot run this script on the current system"
    - > run "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" to allow script execution in this terminal session

Deploy:
    - Azure Functions Extension is used
    - Rightclick on function project. "Deploy to Azure Function" -> fa-mailsummarize (before created in azure)

