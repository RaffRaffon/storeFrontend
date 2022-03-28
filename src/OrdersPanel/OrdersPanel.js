import Header from '../Header/Header'
function OrdersPanel() {

    function searchByUserName(){
        let entry
        if (document.getElementById("username").value!==''){
            entry = document.getElementById("username").value
        }
    }

    function searchByUserEmail(){
        let entry
        if (document.getElementById("useremail").value!==''){
            entry = document.getElementById("useremail").value
        }
    }
    return (
        <div>
            <Header />
            <h1>Orders Panel</h1>
            Search by user name:<input id="username" placeholder='Enter user name'></input><button onClick={searchByUserName}>Search by user name</button><br />
            <br />
            Search by email:<input id="useremail" placeholder='Enter user email'></input><button onClick={searchByUserEmail}>Search by email</button>
        </div>
    )
}

export default OrdersPanel