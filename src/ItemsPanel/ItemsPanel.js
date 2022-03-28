import { Link } from "react-router-dom"
import Header from "../Header/Header"
import { useDispatch, useSelector } from 'react-redux';
import { ItemsService } from "../services/items.service";
function ItemsPanel() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    async function deleteItem(itemId) {
       return window.confirm("Are you sure?") === true ? alert(await ItemsService.deleteItem(itemId)) : null 
    }
    return (
        <div>
            <Header />
            <h1>Items list</h1>
            <table>
                <tr>
                    <th>Item ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {state.originalAllItems.map((item) => {
                    return (<tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.Name}</td>
                        <td>{item.Price}</td>
                        <td><Link to={"/edititem/" + item._id}>Edit</Link></td>
                        <td><button onClick={() => deleteItem(item._id)}>Delete</button></td>
                    </tr>)
                })}
            </table>
            <Link to="/additems">Add item</Link>
        </div>
    )
}

export default ItemsPanel