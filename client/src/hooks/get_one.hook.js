import { $host } from "../http"

export const getNews = async (id) => {
    const {data} = await $host.get('/api/news/getpage/' + id)
    return data
}

export const likeNews = async (id) => {
    const {data} = await $host.post('/api/news/like/' + id)
    return data
}

export const setImportant = async (id) => {
    const {data} = await $host.post('/api/news/setimportant/' + id)
    return data
}

export const setUnImportant = async (id) => {
    const {data} = await $host.post('/api/news/setunimportant/' + id)
    return data
}

export const dontlikeNews = async (id) => {
    const {data} = await $host.post('/api/news/dontlike/' + id)
    return data
}

export const makeComment = async (comment) => {
    const {data} = await $host.post('/api/comment/create', comment)
    return data
}

export const getComments = async (id) => {
    const {data} = await $host.get('/api/comment/find/' + id)
    return data
}

export const deleteComment = async (id) => {
    const {data} = await $host.delete('/api/comment/' + id)
    return data
}

export const deleteNews = async (id) => {
    const {data} = await $host.delete('/api/news/' + id)
    return data
}


export const changeOldPassword = async (dataToChange) => {
    const {data} = await $host.post('/api/auth/change', dataToChange)
    return data
}