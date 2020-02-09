import { createStore, combineReducers } from 'redux'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import totalGame from './reducer/totalGame'
import winGame from './reducer/winGame'
// import anotherReducer from './reducer/anotherReducer'

const reduxState = {
  totalGame,
  winGame
  // anotherReducer
  // routing: routerReducer
}

export type ReduxState = typeof reduxState;

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers(reduxState)
// reducers
)

store.subscribe(() => {
  console.log(store.getState(), 'state ------')
})

console.log(store, 'store');


export default store;