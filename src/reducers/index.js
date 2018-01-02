import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'
import { allPostsQuery } from '../graphql'

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


const deck = (state = null, action) => {
  switch(action.type) {
    case ActionTypes.EDIT_DECK: //id
     return action.deck
    case ActionTypes.NEW_DECK: //id
     return {}
      
    case ActionTypes.START_QUIZ: //id
     return action.deck
      
    case ActionTypes.FINISH_QUIZ: //id
     return null

    case ActionTypes.NEXT_QUESTION: //id
     return null

    case ActionTypes.PREVIOUS_QUESTION: //id
     return null
      
    default: 
      return state;
  }
}

const decks = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.LOAD_DECKS: 
      return action.decks
      
    case ActionTypes.SAVE_DECK: 
      return [
        ...state,
        {
          id: action.deck.id,
          title: action.deck.title,
          _questionsMeta: action.deck._questionsMeta,
          questions: []
        }
      ];

    case ActionTypes.SAVE_DECK: 
      return [
        ...state,
        {
          id: action.deck.id,
          title: action.deck.title,
          _questionsMeta: action.deck._questionsMeta,
          questions: []
        }
      ];

      

    case ActionTypes.DELETE_DECK: //id
      const ids = state.map( deck => { return deck.id })
      const index = action && ids.indexOf(action.id)
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      else {
        return state
      }

    case ActionTypes.SAVE_QUESTION: //id
      return state.map(deck => {
        if (deck.id != action.question.deck.id) {
          return deck
        }
        return {
          ...deck,
          _questionsMeta: {
            ...deck._questionsMeta,
            count: deck._questionsMeta.count + 1
          },
        }
       })

    case ActionTypes.UPDATE_DECK: //id
      return state.map(deck => {
        if (deck.id != state.id) {
          return deck
        }

        return {
          ...state,
          title: action.title
        }
       })
      
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  decks,
  deck
})

export default rootReducer