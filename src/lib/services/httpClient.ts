import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'https://ghibliapi.vercel.app',
})
