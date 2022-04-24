import { Stack } from "@fluentui/react"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useState } from "react"
import { analyzeMail } from "services/cognitiveService"
import { stackStyles, stackTokens } from "utils/stackStyles"

import SummaryConfiguration from "./SummaryConfiguration"
import SummaryResult from "./SummaryResult"

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
                    summary: error.message,
                    sentiment: error.message,
                    isProcessing: false,
                })
            }
        )
    }

    if (mailSummary.isProcessing) {
        return <Progress message="Analysing your mail..." />
    }

    return (
        <main className="ms-welcome__main">
            <Stack tokens={stackTokens.heading} styles={stackStyles}>
                <SummaryConfiguration onStartAnalyze={handleStartAnalyze} />
                <SummaryResult summary={mailSummary.summary} sentiment={mailSummary.sentiment} />
            </Stack>
        </main>
    )
}

export default Summary
