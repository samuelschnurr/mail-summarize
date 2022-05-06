import { DefaultButton, Slider, Stack } from "@fluentui/react"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useEffect, useState } from "react"
import { getMailItem } from "services/officeService"
import { stackItemStyles, stackTokens } from "utils/stackStyles"

export interface SummaryConfigurationProps {
    onStartAnalyze: (mailBody: string, sentenceCount: number) => void
    onSentenceCountChange: (value: number) => void
    sentenceCount: number
}

const SummaryConfiguration = (props: SummaryConfigurationProps) => {
    const [mailItem, setMailItem] = useState({
        body: "",
        error: "",
    })

    useEffect(() => {
        getMailItem().then(
            (body: string) => {
                setMailItem({ body: body, error: "" })
            },
            (error: string) => {
                setMailItem({ body: "", error: error })
            }
        )
    }, [])

    if (!mailItem.body && !mailItem.error) {
        return <Progress message="Loading mail input..." />
    }

    if (mailItem.error) {
        return (
            <Stack tokens={stackTokens.heading} horizontalAlign="center">
                {mailItem.error}
            </Stack>
        )
    }

    return (
        <Stack tokens={stackTokens.heading} horizontalAlign="center">
            <Stack.Item styles={stackItemStyles}>
                <Slider
                    label="Summary length in sentences"
                    min={1}
                    max={20}
                    value={props.sentenceCount}
                    onChange={props.onSentenceCountChange}
                    showValue
                />
            </Stack.Item>
            <Stack.Item>
                <DefaultButton
                    className="ms-welcome__action"
                    iconProps={{ iconName: "ChevronRight" }}
                    onClick={() => props.onStartAnalyze(mailItem.body, props.sentenceCount)}>
                    Start
                </DefaultButton>
            </Stack.Item>
        </Stack>
    )
}

export default SummaryConfiguration
