import axios from 'axios'

const BaseUrl: any = axios.create({
    baseURL: 'http://localhost:3030'
})

export default BaseUrl;