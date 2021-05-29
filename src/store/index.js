import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

export default store = createStore(
    rootReducer, applyMiddleware(createLogger())
)