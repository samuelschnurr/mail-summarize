import { IStackStyles, Stack } from "@fluentui/react"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useState } from "react"
import { analyzeMail } from "services/cognitiveService"
import stackTokens from "utils/stackTokens"

import SummaryConfiguration from "./SummaryConfiguration"
import SummaryResult from "./SummaryResult"

const stackStyles: IStackStyles = {
    root: {
        width: "100%",
    },
}

const Summary = () => {
    const [mailSummary, setMailSummary] = useState({
        summary: "",
        sentiment: "",
        isProcessing: false,
    })

    const handleStartAnalyze = (mailBody: string, sentenceCount: number) => {
        setMailSummary({ ...mailSummary, isProcessing: true })
        analyzeMail(mailBody, sentenceCount).then(
            result => {
                setMailSummary({
                    summary: result.data[0].Summary,
                    sentiment: result.data[0].Sentiment,
                    isProcessing: false,
                })
            },
            error => {
                setMailSummary({
                    summary: error,
                    sentiment: error,
                    isProcessing: false,
                })
            }
        )
    }

    // Loading input
    if (mailSummary.isProcessing) {
        return <Progress message="Analysing your mail..." />
    }

    return (
        <main className="ms-welcome__main">
            <Stack tokens={stackTokens.section} styles={stackStyles}>
                <SummaryConfiguration onStartAnalyze={handleStartAnalyze} />
                <SummaryResult summary={mailSummary.summary} sentiment={mailSummary.sentiment} />
            </Stack>
        </main>
    )
}

export default Summary
