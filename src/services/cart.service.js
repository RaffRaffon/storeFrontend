const axios = require('axios')
const apiUrl = 'http://localhost:8000'


export class CartService {
    static updateUserCartData(cartData, token) {
        axios.put(apiUrl + '/api/carts/updateUserCartData', {
            data: { cartData, token }
        })
    }
    static async getUserCartData(token) {
        // Need to change the post request to get request

        //  Need to change the retrivation by token to retrivation by uid

        const response = await axios.post(apiUrl + '/api/carts/getUserCartData', {
            data: { token }
        })
        return response.data
    }

}