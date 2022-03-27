import { useState } from "react"
import Header from "../Header/Header"
import { ItemsService } from "../services/items.service"
import './additems.css';
function AddItems() {
    const [itemImagePreview, setItemImagePreview] = useState()

    async function addItem() {
        const name = document.getElementById("name").value
        const price = document.getElementById("price").value
        const imageurl = document.getElementById("imageurl").value
        const imageupload = document.getElementById("imageupload").value
        let picture = ''
        if (imageurl !== '') picture = imageurl
        else if (imageupload !== '') picture = imageupload
        const description = document.getElementById("desc").value
        const itemData = { name, price, picture, description }
        alert(await ItemsService.addItem(itemData))
    }

    function changeItemPreview(e) {
        setItemImagePreview(e.target.value)
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
            Image URL:<input id="imageurl" onChange={changeItemPreview}></input><br />
            <br />
            Or image upload:<input id="imageupload"></input><br />
            <br />
            Description:<textarea id="desc"></textarea><br />
            <br />
            <button onClick={addItem}>Add item</button>
        </div>
    )
}

export default AddItems