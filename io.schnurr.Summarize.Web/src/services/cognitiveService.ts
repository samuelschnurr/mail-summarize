import axios from "axios"

export const analyzeMail = (mailInput: string) =>
    axios({
        method: "POST",
        url: "/SummarizeFunction",
        data: { mailInput },
    })
