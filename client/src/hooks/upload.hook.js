import { $host } from "../http"

export const createOneNews = async (news) => {
    // localStorage.setItem('TESTING', JSON.stringify(news.subtitle))
    const {data} = await $host.post('/api/news/create', news)
    return data
}