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

    static async deleteItem(itemId, itemName) {
        const response = await axios.delete(apiUrl + '/api/items/deleteItem', {
            data: { itemId, itemName }
        })
        return response.data
    }

    static async addItemImage(imageData, imageName) {
        const response = await axios.post(apiUrl + '/api/items/addItemImage', {
            data: { imageData, imageName }
        })
        return response.data
    }

    static async handleUpload(imageData, imageName, method) {

        if (method === "ByUrl") return await ItemsService.addItemImage(imageData, imageName)
        else
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const imageUrlFromCloudinary = await ItemsService.addItemImage(reader.result, imageName)
                    resolve(imageUrlFromCloudinary);
                }
                reader.readAsDataURL(imageData);
            });
    }
}