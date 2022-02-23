import { initializeIcons } from "@fluentui/font-icons-mdl2"
import { ThemeProvider } from "@fluentui/react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import App from "./components/App"
initializeIcons()

let isOfficeInitialized = false

const title = "Mail Summarize"

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <ThemeProvider>
                <Component title={title} isOfficeInitialized={isOfficeInitialized} />
            </ThemeProvider>
        </AppContainer>,
        document.getElementById("container")
    )
}

// Imported javascript api via cdn in taskpane.html
// eslint-disable-next-line no-undef
Office.onReady(() => {
    isOfficeInitialized = true
    render(App)
})

if ((module as any).hot) {
    ;(module as any).hot.accept("./components/App", () => {
        render(App)
    })
}
