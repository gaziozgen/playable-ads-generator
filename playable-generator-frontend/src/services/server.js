import axios from 'axios'
const baseUrl = '/api'

const login = (username, password) => {
    console.log("login request")
    const request = axios.post(`${baseUrl}/auth`, { username, password })
    return request.then((response) => {
        console.log(response.data)

        console.log('loggen in')
        return response.data
    })
}

const mainService = { login }

export default mainService