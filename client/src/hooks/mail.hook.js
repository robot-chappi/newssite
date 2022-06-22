import { $host } from "../http"

export const sendEveryone = async (email) => {
    const {data} = await $host.post('/api/email/send', email)
    return data
}

export const getAuthCode = async (email) => {
    const {data} = await $host.post('/api/email/getcode', email)
    return data
}