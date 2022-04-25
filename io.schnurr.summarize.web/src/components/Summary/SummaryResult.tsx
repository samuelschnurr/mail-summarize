import { Stack } from "@fluentui/react"
import { Text } from "@fluentui/react/lib/Text"
import * as React from "react"
import { stackTokens } from "utils/stackStyles"

export interface SummaryResultProps {
    summary: string
    sentiment: string
}

const SummaryResult = (props: SummaryResultProps) => {
    if (props.summary || props.sentiment) {
        return (
            <>
                <Stack tokens={stackTokens.heading}>
                    <Text variant={"large"} block>
                        Summary
                    </Text>
                    <Text>{props.summary}</Text>
                </Stack>
                <Stack tokens={stackTokens.heading}>
                    <Text variant={"large"} block>
                        Sentiment
                    </Text>
                    <Text>{props.sentiment}</Text>
                </Stack>
            </>
        )
    }
    return <></>
}

export default SummaryResult
