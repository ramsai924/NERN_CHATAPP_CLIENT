import axios from 'axios'

const BaseUrl: any = axios.create({
    // baseURL: 'http://localhost:3030',
    baseURL: 'http://localhost:3030',

    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
})

export default BaseUrl;