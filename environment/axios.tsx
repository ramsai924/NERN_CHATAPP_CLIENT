import axios from 'axios'

const BaseUrl = axios.create({
    baseURL: 'http://localhost:3030'
})

export default BaseUrl;