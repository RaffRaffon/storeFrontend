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

    static async getSpecificOrder(id){
        const orderDetails = await axios.get(apiUrl + '/api/orders/getSpecificOrder', {
            params: {
                id
            }
        })
        return orderDetails.data
    }

    static async getUserOrders(id){
        const orderDetails = await axios.get(apiUrl + '/api/orders/getUserOrders', {
            params: {
                id
            }
        })
        return orderDetails.data
    }
}