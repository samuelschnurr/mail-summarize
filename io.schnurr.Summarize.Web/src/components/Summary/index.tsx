import { DefaultButton } from "@fluentui/react"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useEffect, useState } from "react"
import { analyzeMail } from "services/cognitiveService"
import { getMailInput } from "services/officeService"

const Summary = () => {
    const [mailInput, setMailInput] = useState({
        body: "",
        error: "",
    })

    const [mailSummary, setMailSummary] = useState({
        summary: "",
        sentiment: "",
    })

    useEffect(() => {
        getMailInput().then(
            (body: string) => {
                setMailInput({ body: body, error: "" })
            },
            (error: string) => {
                setMailInput({ body: "", error: error })
            }
        )
    }, [])

    useEffect(() => {
        if (mailInput.body) {
            analyzeMail(mailInput.body).then(result => {
                setMailSummary({
                    summary: result.data[0].Summary,
                    sentiment: result.data[0].Sentiment,
                })
            })
        }
    }, [mailInput.body])

    // Loading input
    if (!mailInput.body && !mailInput.error) {
        return <Progress message="Loading" />
    }

    // Loading summary
    if (mailInput.body && !mailSummary.summary && !mailSummary.sentiment) {
        return <Progress message="Loading" />
    }

    return (
        <main className="ms-welcome__main">
            <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                {mailInput.error || mailSummary.summary}
            </h2>
            <DefaultButton
                className="ms-welcome__action"
                iconProps={{ iconName: "ChevronRight" }}
                onClick={() => {
                    console.log("Extend")
                }}>
                Extend summary
            </DefaultButton>
        </main>
    )
}

export default Summary
