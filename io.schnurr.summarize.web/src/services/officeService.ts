export const getMailItem = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const mailBoxItem = Office?.context?.mailbox?.item

        if (!mailBoxItem) {
            reject("No mail item found")
            return
        }

        mailBoxItem.body.getAsync(Office.CoercionType.Text, asyncResult => {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                reject(asyncResult.error.message)
            } else {
                resolve(asyncResult.value)
            }
        })
    })
}
