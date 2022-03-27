import { useState } from "react"
import Header from "../Header/Header"

function AddItems() {
    const [itemImagePreview,setItemImagePreview]=useState()
    return (
        <div>
            <Header />
            <h1>Add item</h1>
            <img src={itemImagePreview} alt="itemImagePreview"></img><br/>
            <br/>
            Name:<input></input><br/>
            <br/>
            Price:<input></input><br/>
            <br/>
            Image URL:<input></input><br/>
            <br/>
            Or image upload:<input></input><br/>
            <br/>
            Description:<textarea></textarea><br/>
            <br/>
            <button>Add item</button>            
        </div>
    )
}

export default AddItems