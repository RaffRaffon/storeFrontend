const axios = require('axios')
const apiUrl = 'http://localhost:8000'

export class usersService {
    static registerUser(userData) {
        axios.post(apiUrl + '/api/users/registerUser', {
            data: { userData }
        })
    }

    static async checkCreds(userData) {
        // Need to change the post request to get request

        const response = await axios.post(apiUrl + '/api/users/checkCreds', {
            data: { userData }
        })
        return (response.data);
    }

    static async checkEmail(email) {
        const token = localStorage['store-user']
        const response = await axios.post(apiUrl + '/api/users/checkEmail', {
            data: { email , token }
        })
        return response.data
    }

    static async getUsername(email) {
        // Need to change the post request to get request
        const response = await axios.post(apiUrl + '/api/users/getUsername', {
            data: { email }
        })
        return response.data
    }

    static async getPersonalData() {
        const token = localStorage['store-user']

        // Need to change the post request to get request
        const response = await axios.post(apiUrl + '/api/users/getPersonalData', {
            data: { token }
        })
        return response.data
    }

    static async updatePersonalData(userData) {
        // Need to change the post request to get request
        axios.put(apiUrl + '/api/users/updatePersonalData', {
            data: { userData }
        })
    }
    static async checkTokenForLogin(token) {
        // Need to change the post request to get request
        const response = await axios.post(apiUrl + '/api/users/checkTokenForLogin', {
            data: { token }
        })
        return response.data
    }

    static moveCartToDB(cartData,email){
        axios.post(apiUrl + '/api/users/moveCartToDB', {
            data: { cartData,email }
        })
    }


    static async getUserId(email){
        // Need to change the post request to get request
        const response = await axios.post(apiUrl + '/api/users/getUserId', {
            data: { email }
        })
        return response.data
    }
}