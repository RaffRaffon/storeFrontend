import { Link } from "react-router-dom"
import Header from "../Header/Header"
import { useDispatch, useSelector } from 'react-redux';
function EditItems() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
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
                        <td><Link to={"/order/"+item._id}>Edit</Link></td>
                        <td><button>Delete</button></td>
                    </tr>)
                })}
            </table>          
        </div>
    )
}

export default EditItems