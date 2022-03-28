import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Header from "../Header/Header"
import { ItemsService } from "../services/items.service"
import './edititem.css';
function EditItem() {
    const { id } = useParams()
    const [itemImagePreview, setItemImagePreview] = useState('')
    const [item, setItem] = useState({})

    useEffect(() => {
        async function getItem() {
            setItem(await ItemsService.getSpecificItem(id))
        }
        getItem()
    }, [])

    useEffect(() => {
        if (item.Picture) setItemImagePreview(item.Picture)
    }, [item])
    async function editItem() {
        const name = document.getElementById("name").value
        const price = document.getElementById("price").value
        const imageurl = document.getElementById("imageurl").value
        const imageupload = document.getElementById("imageupload").value
        let picture = ''
        if (imageurl !== '') picture = imageurl
        else if (imageupload !== '') picture = imageupload
        const description = document.getElementById("desc").value
        const itemData = { name, price, picture, description, _id:id}
        alert(await ItemsService.editItem(itemData))
    }

    function changeItemPreview(e) {
        setItemImagePreview(e.target.value)
    }
    return (
        <div>
            <Header />
            <h1>Edit item</h1>
            <img src={itemImagePreview} alt="itemImagePreview" className="itemImagePreview"></img><br />
            <br />
            Name:<input defaultValue={item.Name} id="name"></input><br />
            <br />
            Price:<input defaultValue={item.Price} id="price"></input><br />
            <br />
            Image URL:<input defaultValue={item.Picture} id="imageurl" onChange={changeItemPreview}></input><br />
            <br />
            Or image upload:<input id="imageupload"></input><br />
            <br />
            Description:<textarea defaultValue={item.Description} id="desc"></textarea><br />
            <br />
            <button onClick={editItem}>Edit item</button>
        </div>
    )
}

export default EditItem