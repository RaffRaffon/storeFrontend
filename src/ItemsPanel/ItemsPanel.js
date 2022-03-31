import { Link } from "react-router-dom"
import Header from "../Header/Header"
import { useDispatch, useSelector } from 'react-redux';
import { ItemsService } from "../services/items.service";
import { useEffect, useState } from "react";
function ItemsPanel() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [items, setItems] = useState([])

    useEffect(() => {
        if (state.originalAllItems.length > 0) setItems(state.originalAllItems)
    }, [state.originalAllItems])

    async function deleteItem(itemId, itemIndex) {
        if (window.confirm("Are you sure?") === true) {
            alert(await ItemsService.deleteItem(itemId))
            const itemsArray = [...items]
            itemsArray.splice(itemIndex, 1)
            setItems(itemsArray)
            dispatch({ type: "REDUXITEMSCHANGE" })
        }
    }


    return (
        <div>
            <Header />
            <h1>Items list</h1>
            <button onClick={()=>console.log(state.originalAllItems)}>show state original items</button>
            <table>
                <tr>
                    <th>Item ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {items.map((item, index) => {
                    return (<tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.Name}</td>
                        <td>{item.Price}</td>
                        <td><Link to={"/edititem/" + item._id}>Edit</Link></td>
                        <td><button onClick={() => deleteItem(item._id, index)}>Delete</button></td>
                    </tr>)
                })}
            </table>
            <Link to="/additems">Add item</Link>
        </div>
    )
}

export default ItemsPanel