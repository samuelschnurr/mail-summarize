Install nodejs
Install Outlook for Desktop (or see below)


Setup local development (app project):
    - npm i  
    - npm run start (debugg)  
      - Starts outlook desktop
    - or npm run dev-server (for local server)
      - Access addin via browser on the defined port or manually sideload addin as described here: https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing?tabs=windows
    => Registers certificat and registers manifest in outlook (sideloaded addin)
    - Azure function must be running locally

Deploy:
Setup variables with terraform output created resource (webpack.config.js):
    - const appUrlProd = "https://app-mailsummarize.azurewebsites.net/"
    - const apiUrlProd = "https://fa-mailsummarize.azurewebsites.net/api"
    axios.ts:  axios.defaults.headers.common["code"] - function key (get from portal after function is deployed)
     Azure Storage Extension is used
    - create build: npm run build:dev or npm run build (= prodution)
    - Rightclick on /dist folder. "Deploy Static Website via Azure Storage" -> "stamailsummarizeapp" (before created in azure)
    - The site of the deployed storage site is already named in terraform output