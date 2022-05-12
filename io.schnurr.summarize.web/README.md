# Mail Summarize Web

[![Node CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/node.yml/badge.svg)](https://github.com/samuelschnurr/mail-summarize/actions/workflows/node.yml)

This project represents the web project which is wrapped as Microsoft Outlook Addin for <a href="https://github.com/samuelschnurr/mail-summarize#mail-summarize-outlook-addin">Mail Summarize</a>. 

- Single page application based on ReactJS
- Visualization of summarization and sentiment
- Mailbox Item.Read permissions
- First run experience

## Before you start

- Install <a href="https://nodejs.org/en/">Node.js</a>
- Install <a href="https://www.microsoft.com/de-de/microsoft-365/outlook">Outlook for Desktop</a> or use an Outlook Web account
- Setup the <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.api">Azure function</a> to communicate with the backend
- Notice that this application is hosted at `https://localhost:3000/`


## Build and run

To build and run the outlook Add-In execute the following commands. Make sure your <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.api">Azure function</a> is running locally.

```
npm install
```

Start debugging in Outlook Desktop. Automatically the manifest is registered and the certificate installed.

```
npm run start
```

Alternatively you can <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing?tabs=windows">sideload manually</a> and then start local development server.

```
npm run build:dev
npm run dev-server
```

## Deploy

Before you deploy the web project to azure make sure you set the configuration with the correct values which you retreived in the <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.infrastructure">Terraform setup output</a>.

- Set the `appUrlProd` in `webpack.config.js` with the uri of your blob
- Set the `apiUrlProd` in `webpack.config.js` with the uri of your function
- Set the `code` in `axios.ts` with the api key of your azure function
 
Then create a build which will be placed under `/dist` with the command

```
npm run build
```

After that right click on the `/dist` folder and `Deploy Static Website via Azure Storage`. Select your blob storage `stamailsummarizeapp`.

Notice: For this deployment you need the recommended extension `Azure Storage Extension` which is currently in a beta. 

## License

Get more information about the licensing of this repository at the <a href="https://github.com/samuelschnurr/mail-summarize#license">root level</a>.
