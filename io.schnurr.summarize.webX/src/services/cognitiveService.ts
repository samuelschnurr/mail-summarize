import axios from "axios"

export const analyzeMail = (mailContent: string, maxSentenceCount: number) =>
    axios({
        method: "POST",
        url: "/SummarizeFunction",
        data: { MailContent: mailContent, MaxSentenceCount: maxSentenceCount },
    })
