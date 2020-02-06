import { createStore, combineReducers } from 'redux'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducer/reducer'
import anotherReducer from './reducer/anotherReducer'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    reducers,
    anotherReducer
    // routing: routerReducer
  })
// reducers
)

store.subscribe(() => {
  console.log(store.getState(), 'state ------')
})

export default store;