import { DefaultButton, FontIcon, Stack } from "@fluentui/react"
import { Text } from "@fluentui/react/lib/Text"
import * as React from "react"
import { iconClass } from "utils/iconStyles"
import { stackListItemStyles, stackStyles, stackTokens } from "utils/stackStyles"

const renderFeatureInformation = () => {
    const featureInformation = [
        { text: "Summarize long mails", icon: "Mail" },
        { text: "Summarize discussions", icon: "ActivityFeed" },
        { text: "Recognize sentiment", icon: "Emoji2" },
    ]

    const items = featureInformation.map((feature, index) => (
        <Stack.Item styles={stackListItemStyles} key={index}>
            <FontIcon iconName={feature.icon} className={iconClass} />
            <Text variant="small" block style={{ width: "150px" }}>
                {feature.text}
            </Text>
        </Stack.Item>
    ))

    return <>{items}</>
}

const Placemat = () => {
    return (
        <Stack tokens={stackTokens.sectionLargeGap} styles={stackStyles} horizontalAlign="center">
            <Stack.Item>
                <Text variant={"medium"} block>
                    Analyze your first mail
                </Text>
            </Stack.Item>
            {renderFeatureInformation()}
            <Stack.Item>
                <DefaultButton
                    className="ms-welcome__action"
                    iconProps={{ iconName: "ChevronRight" }}
                    onClick={() => {
                        Office.context.roamingSettings.set("disablePlacemat", true)
                    }}>
                    Get started
                </DefaultButton>
            </Stack.Item>
        </Stack>
    )
}

export default Placemat
