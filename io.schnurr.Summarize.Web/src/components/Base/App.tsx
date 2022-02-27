import { DefaultButton } from "@fluentui/react"
import * as React from "react"

import HeroList, { HeroListItem } from "../HeroList/HeroList"
import Progress from "../Shared/Progress"
import icon from "./../../../assets/icon.png"
import Header from "./Header"

export interface AppProps {
    title: string
    isOfficeInitialized: boolean
}

const listItems = [
    {
        icon: "Ribbon",
        primaryText: "Achieve more with Office integration",
    },
    {
        icon: "Unlock",
        primaryText: "Unlock features and functionality",
    },
    {
        icon: "Design",
        primaryText: "Create and visualize like a pro",
    },
] as HeroListItem[]

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
            <HeroList
                message="Discover what Office Add-ins can do for you today!"
                items={listItems}>
                <p className="ms-font-l">
                    Modify the source files, then click <b>Run</b>.
                </p>
                <DefaultButton
                    className="ms-welcome__action"
                    iconProps={{ iconName: "ChevronRight" }}
                    onClick={() => alert("Clicked!")}>
                    Run
                </DefaultButton>
            </HeroList>
        </div>
    )
}

export default App
