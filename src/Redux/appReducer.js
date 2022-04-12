const appReducer = (state = {
    originalAllItems: [], items: [], itemsFirstLoad: false,
    displayCart: false, cartChanged: false, isLoggedIn: false, userName: "",
    totalProducts: 0, totalPrice: 0, checkoutCompleted: false, isItemArrayChanged: false, imageBlob: undefined
}, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isLoggedIn: true, userName: action.payload.userName }
        case "LOGOUT":
            return { ...state, isLoggedIn: false, userName: "" }
        case "SETITEMS":
            return { ...state, originalAllItems: action.payload.originalAllItems, items: action.payload.items || state.items, itemsFirstLoad: true }
        case "SETNEWITEMS":
            return { ...state, items: action.payload.newItems }
        case "REDUXITEMSCHANGE":
            return { ...state, isItemArrayChanged: !state.isItemArrayChanged }
        case "DISPLAYCART":
            return { ...state, displayCart: (!state.displayCart) }
        case "CHANGECART":
            return { ...state, cartChanged: (!state.cartChanged), checkoutCompleted: false }
        case "RESETITEMS":
            return { ...state, items: state.originalAllItems }
        case "SETCARTTOTALS":
            return { ...state, totalProducts: action.payload.totalProducts, totalPrice: action.payload.totalPrice || state.totalPrice }
        case "ORDERCOMPLETED":
            return { ...state, checkoutCompleted: true }
        case "SETIMAGEBLOB":
            return { ...state, imageBlob: action.payload?.imageBlob || undefined }
        default:
            return state
    }
}
export default appReducer;