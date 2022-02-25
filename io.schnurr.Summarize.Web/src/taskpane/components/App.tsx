import { DefaultButton } from "@fluentui/react"
import * as React from "react"
import { useEffect, useState } from "react"

import Header from "./Header"
import HeroList, { HeroListItem } from "./HeroList"
import Progress from "./Progress"

export interface AppProps {
    title: string
    isOfficeInitialized: boolean
}

const App = (props: AppProps) => {
    const [listItems, setListItems] = useState([] as HeroListItem[])

    useEffect(() => {
        setListItems([
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
        ]),
            []
    })

    if (!props.isOfficeInitialized) {
        return (
            <Progress
                title={props.title}
                logo={require("./../../../assets/icon.png")}
                message="Please sideload your addin to see app body."
            />
        )
    }

    return (
        <div className="ms-welcome">
            <Header
                logo={require("./../../../assets/icon.png")}
                title={props.title}
                message="Welcome"
            />
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
