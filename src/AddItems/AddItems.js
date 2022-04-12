import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUpload from "../CloudinaryUpload/CloudinaryUpload";
import Header from "../Header/Header"
import { ItemsService } from "../services/items.service"
import './additems.css';
function AddItems() {
    const state = useSelector(state => state)

    const dispatch = useDispatch()
    const [itemImagePreview, setItemImagePreview] = useState()
    async function addItem() {
        const name = document.getElementById("name").value.trim()
        const imageUrl = await ItemsService.handleUpload(state.imageBlob, name)
        const price = document.getElementById("price").value
        const description = document.getElementById("desc").value
        const itemData = { name, price, picture: imageUrl, description }
        alert(await ItemsService.addItem(itemData))
        dispatch({ type: "REDUXITEMSCHANGE" })
    }

    return (
        <div>
            <Header />
            <h1>Add item</h1>
            <img src={itemImagePreview} alt="itemImagePreview" className="itemImagePreview"></img><br />
            <br />
            Name:<input id="name"></input><br />
            <br />
            Price:<input id="price"></input><br />
            <br />
            Image upload: <CloudinaryUpload alterImagePreview={(imageInBase64) => setItemImagePreview(imageInBase64)} /><br />
            <br />
            Description:<textarea id="desc"></textarea><br />
            <br />
            <button onClick={addItem}>Add item</button>
        </div>
    )
}

export default AddItems