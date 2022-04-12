import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import CloudinaryUpload from "../CloudinaryUpload/CloudinaryUpload";
import Header from "../Header/Header"
import { ItemsService } from "../services/items.service"
import './edititem.css';
import { useDispatch, useSelector } from "react-redux";
function EditItem() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [itemImagePreview, setItemImagePreview] = useState('')
    const [item, setItem] = useState({})
    async function getItem() {
        setItem(await ItemsService.getSpecificItem(id))
    }
    useEffect(() => {
        getItem()
        dispatch({ type: "SETIMAGEBLOB" })
    }, [])

    useEffect(() => {
        if (item.Picture) setItemImagePreview(item.Picture)
    }, [item])
    async function editItem() {
        const name = document.getElementById("name").value.trim()
        let imageUrl
        if (state.imageBlob) imageUrl = await ItemsService.handleUpload(state.imageBlob, name, "ByBlob")
        else imageUrl = await ItemsService.handleUpload(item.Picture, name, "ByUrl")
        const price = document.getElementById("price").value
        const description = document.getElementById("desc").value
        const itemData = { name, price, picture: imageUrl, description, _id: id, oldName: item.Name }
        alert(await ItemsService.editItem(itemData))
        getItem()
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
            Image upload: <CloudinaryUpload alterImagePreview={(imageInBase64) => setItemImagePreview(imageInBase64)} /><br />
            <br />
            Description:<textarea defaultValue={item.Description} id="desc"></textarea><br />
            <br />
            <button onClick={editItem}>Edit item</button>
        </div>
    )
}

export default EditItem