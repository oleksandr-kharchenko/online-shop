import axios, { AxiosResponse } from 'axios'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data
}

Api.interceptors.response.use(onResponseSuccess)