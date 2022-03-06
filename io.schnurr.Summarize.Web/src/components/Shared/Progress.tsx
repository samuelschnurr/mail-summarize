import { Spinner, SpinnerSize } from "@fluentui/react"
import * as React from "react"

export interface ProgressProps {
    logo?: string
    title?: string
    message: string
}

const Progress = (props: ProgressProps) => {
    return (
        <section className="ms-welcome__progress ms-u-fadeIn500">
            {renderLogo(props)}
            {renderTitle(props)}
            <Spinner size={SpinnerSize.large} label={props.message} />
        </section>
    )
}

const renderLogo = (props: ProgressProps) => {
    if (props.logo && props.title) {
        return <img width="90" height="90" src={props.logo} alt={props.title} title={props.title} />
    }

    return <></>
}

const renderTitle = (props: ProgressProps) => {
    if (props.message) {
        return (
            <h1 className="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">
                {props.title}
            </h1>
        )
    }

    return <></>
}

export default Progress
