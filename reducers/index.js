import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

// Extras
const user = (state = null, action) => {
  switch(action.type) {
    case ActionTypes.LOGIN: //id
     return action.user
      
    case ActionTypes.LOGOUT: //id
     return null
      
    default: 
      return state;
  }
}

const oi = (state = "xxx", action) => {
  switch(action.type) {
    case ActionTypes.OI: //id
     return action.ola
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  oi,
  user
})

export default rootReducer