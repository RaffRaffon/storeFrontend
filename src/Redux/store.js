import { createStore } from 'redux'
import rootReducer from './appReducer'

const store = createStore(rootReducer)

export default store