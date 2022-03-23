const axios = require('axios')
const apiUrl = 'http://localhost:8000'


export class OrdersService {
    static sendOrder(orderData) {
        axios.post(apiUrl + '/api/orders/sendOrder', {
            data: { orderData }
        })
    }
    static async getOrders(token) {
        // Need to change the post request to get request
        const ordersDetails = await axios.post(apiUrl + '/api/orders/getOrders', {
            data: { token }
        })
        return ordersDetails.data
    }
}