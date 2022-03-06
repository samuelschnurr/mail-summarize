import icon from "@assets/icon.png"
import * as React from "react"

import Progress from "../Shared/Progress"
import Summary from "../Summary/Summary"
import Header from "./Header"

export interface AppProps {
    title: string
    isOfficeInitialized: boolean
}

const App = (props: AppProps) => {
    if (!props.isOfficeInitialized) {
        return (
            <Progress
                title={props.title}
                logo={icon}
                message="Please sideload your addin to see app body."
            />
        )
    }

    return (
        <div className="ms-welcome">
            <Header logo={icon} title={props.title} message="Welcome" />
            <Summary />
        </div>
    )
}

export default App
