const axios = require('axios')
const apiUrl = 'http://localhost:8000'


export class ItemsService {
    static async getAllItems() {
        const response = await axios.get(apiUrl + '/api/items/sendAllItemsData')
        return response.data
    }

    static async getSpecificItem(id) {
        const response = await axios.get(apiUrl + '/api/items/getSpecificItem', {
            params: {
                id
            }
        })
        return response.data
    }

    static async addItem(itemData) {
        const response = await axios.post(apiUrl + '/api/items/addItem', {
            data: { itemData }
        })
        return response.data
    }
    static async editItem(itemData) {
        const response = await axios.put(apiUrl + '/api/items/editItem', {
            data: { itemData }
        })
        return response.data
    }
}