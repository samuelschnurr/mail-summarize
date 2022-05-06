import { IStackItemStyles, IStackStyles } from "@fluentui/react"

export const stackStyles: IStackStyles = {
    root: {
        width: "100%",
    },
}

export const stackListItemStyles: IStackStyles = {
    root: {
        width: "100%",
        display: "inline-flex",
        justifyContent: "center",
    },
}

export const stackItemStyles: IStackItemStyles = {
    root: {
        width: "100%",
    },
}

export const stackTokens = {
    heading: {
        childrenGap: 5,
    },
    section: {
        childrenGap: 15,
        fullWidth: true,
    },
    sectionLargeGap: {
        childrenGap: 30,
        fullWidth: true,
    },
}
