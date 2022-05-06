import icon from "@assets/icon.png"
import * as React from "react"
import { useEffect, useState } from "react"

import Placemat from "../Placemat"
import Progress from "../Shared/Progress"
import Summary from "../Summary"
import Header from "./Header"

export interface AppProps {
    title: string
    isOfficeInitialized: boolean
}

const App = (props: AppProps) => {
    const [disablePlacemat, setDisablePlacemat] = useState(
        Office?.context?.roamingSettings?.get("disablePlacemat")
    )

    const handleDisablePlacemat = () => {
        try {
            Office.context.roamingSettings.set("disablePlacemat", true)
            setDisablePlacemat(true)
        } catch (error) {
            console.log(error)
        }
    }

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
            <main className="ms-welcome__main">
                {disablePlacemat ? (
                    <Summary />
                ) : (
                    <Placemat onDisablePlacemat={handleDisablePlacemat} />
                )}
            </main>
        </div>
    )
}

export default App
