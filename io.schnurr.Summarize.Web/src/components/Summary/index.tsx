import { DefaultButton, Slider, Stack } from "@fluentui/react"
import { Text } from "@fluentui/react/lib/Text"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useEffect, useState } from "react"
import { analyzeMail } from "services/cognitiveService"
import { getMailInput } from "services/officeService"

const Summary = () => {
    const [sliderValue, setSliderValue] = useState(3)
    const handleSliderChange = (value: number) => setSliderValue(value)

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

    // Loading input
    if (!mailInput.body && !mailInput.error) {
        return <Progress message="Loading" />
    }

    const tokens = {
        sectionStack: {
            childrenGap: 15,
        },
        headingStack: {
            childrenGap: 5,
        },
    }

    return (
        <main className="ms-welcome__main">
            <Stack tokens={tokens.sectionStack}>
                <Stack tokens={tokens.headingStack} horizontalAlign="center">
                    <Stack.Item>
                        <Slider
                            label="Summary length in sentences"
                            min={1}
                            max={20}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            showValue
                        />
                    </Stack.Item>
                    <Stack.Item>
                        <DefaultButton
                            className="ms-welcome__action"
                            iconProps={{ iconName: "ChevronRight" }}
                            onClick={() => {
                                if (mailInput.body) {
                                    analyzeMail(mailInput.body).then(result => {
                                        setMailSummary({
                                            summary: result.data[0].Summary,
                                            sentiment: result.data[0].Sentiment,
                                        })
                                    })
                                }
                            }}>
                            Start
                        </DefaultButton>
                    </Stack.Item>
                </Stack>
                <Stack tokens={tokens.headingStack}>
                    <Text variant={"large"} block>
                        Summary
                    </Text>
                    <Text>{mailInput.error || mailSummary.summary}</Text>
                </Stack>
                <Stack tokens={tokens.headingStack}>
                    <Text variant={"large"} block>
                        Sentiment
                    </Text>
                    <Text>{mailInput.error || mailSummary.sentiment}</Text>
                </Stack>
            </Stack>
        </main>
    )
}

export default Summary
