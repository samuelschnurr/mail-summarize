import icon from "@assets/icon.png"
import * as React from "react"

import Placemat from "../Placemat"
import Progress from "../Shared/Progress"
import Summary from "../Summary"
import Header from "./Header"

export interface AppProps {
    title: string
    isOfficeInitialized: boolean
}

const disablePlacemat = Office.context.roamingSettings.get("disablePlacemat")

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
            <main className="ms-welcome__main">{disablePlacemat ? <Summary /> : <Placemat />}</main>
        </div>
    )
}

export default App
