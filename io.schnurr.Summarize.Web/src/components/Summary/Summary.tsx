import { DefaultButton } from "@fluentui/react"
import Progress from "components/Shared/Progress"
import * as React from "react"
import { useEffect, useState } from "react"
import { getMailInput } from "services/officeService"

const Summary = () => {
    const [mailInput, setMailInput] = useState({
        body: "",
        error: "",
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

    if(!mailInput.body && !mailInput.error){
        return <Progress message="Loading" />
    }

    return (
        <main className="ms-welcome__main">
            <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                {mailInput.error}
            </h2>
            {!mailInput.error && (
            <DefaultButton
                className="ms-welcome__action"
                iconProps={{ iconName: "ChevronRight" }}
                onClick={() => alert("Clicked!")}>
                Extend summary
            </DefaultButton>)}
        </main>
    )
}

export default Summary
