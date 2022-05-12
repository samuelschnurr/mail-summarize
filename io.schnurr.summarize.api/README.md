# Mail Summarize Api

[![.NET CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/dotnet.yml/badge.svg)](https://github.com/samuelschnurr/mail-summarize/actions/workflows/dotnet.yml)

This project represents the api backend to execute text analysis for <a href="https://github.com/samuelschnurr/mail-summarize#mail-summarize-outlook-addin">Mail Summarize</a>. The main part of this Add-In is delivered by the text summarization service by Microsoft. However, since this is still in beta (Azure.AI.TextAnalytics --version 5.2.0-beta.1), there is potential for optimization. 

- Azure function
- Azure cognitive services with text analytics
- Azure text summarization (beta)
- Azure sentiment analysis
- Azure cli keyvault integration

## Before you start

- Install the <a href="https://azcliprod.blob.core.windows.net/msi/azure-cli-2.33.1.msi">Azure Cli</a>
- Install the <a href="https://dotnet.microsoft.com/download/dotnet/5.0">.NET 5 SDK</a> (Required for <a href="https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker">Azure Functions Worker</a>)
- Install the <a href="https://dotnet.microsoft.com/download/dotnet/3.1">.NET Core 3.1 SDK</a> (Required for <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-class-library?tabs=v2%2Ccmd#supported-versions">Azure Functions Runtime 3.x</a>)
- Install <a href="https://nodejs.org/en/">Node.js</a>
- Install azure functions core tools with the command `npm i -g azure-functions-core-tools@3 --unsafe-perm true`
- Notice that this application is hosted at `http://localhost:7071/`

## Build and run

To build and run the azure function follow these steps.

Login to your azure account with

```
az login
```

Build your project with 

```
dotnet build
```

In the `local.settings.json` set the value of `KeyVaultEndpoint` with uri of the key vault which you retreived in the <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.infrastructure">Terraform setup output</a>. The `local.setting.json` is pushed to git to simplify the setup process for you. It does not contain secrets. The setup of the key vault is required in combination with `az login` to authenticate your user to the key vault, which holds the credentials for the cognitive service.

Run the command

```
func host start
```

Notice:
If the execution fails with error `Script is not digitally signed. You cannot run this script on the current system` run the following command to allow script execution in this terminal session.

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Deploy

Before you deploy the web project to azure make sure you set the configuration with the correct values which you retreived in the <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.infrastructure">Terraform setup output</a>.

Right click on the function project and `Deploy to Azure Function`. Select your azure function `fa-mailsummarize`.

Notice: For this deployment you need the recommended extension `Azure Functions Extension`. 

## License

Get more information about the licensing of this repository at the <a href="https://github.com/samuelschnurr/mail-summarize#license">root level</a>.
