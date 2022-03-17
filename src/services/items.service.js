const axios = require('axios')
const apiUrl = 'http://localhost:8000'


export class ItemsService {
    static async getAllItems(){
        const response = await axios.get(apiUrl + '/api/items/sendAllItemsData')
        return response.data
    }
}