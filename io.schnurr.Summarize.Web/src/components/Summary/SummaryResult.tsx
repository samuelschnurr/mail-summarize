import { Stack } from "@fluentui/react"
import { Text } from "@fluentui/react/lib/Text"
import * as React from "react"
import stackTokens from "utils/stackTokens"

const SummaryResult = ({ summary, sentiment }: { summary: string; sentiment: string }) => {
    return (
        <>
            <Stack tokens={stackTokens.heading}>
                <Text variant={"large"} block>
                    Summary
                </Text>
                <Text>{summary}</Text>
            </Stack>
            <Stack tokens={stackTokens.heading}>
                <Text variant={"large"} block>
                    Sentiment
                </Text>
                <Text>{sentiment}</Text>
            </Stack>
        </>
    )
}

export default SummaryResult
