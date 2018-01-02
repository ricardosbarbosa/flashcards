import { graphql } from 'react-apollo'

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'
import {
  allDecksQuery,
  deckByIdQuery,
  createDeckMutation,
  createQuestionMutation
} from '../graphql'


const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbksvgjy0y6w0171i6nujizx' }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const EDIT_DECK = "EDIT_DECK"
export const NEW_DECK = "NEW_DECK"
export const START_QUIZ = "START_QUIZ"
export const FINISH_QUIZ = "FINISH_QUIZ"
export const NEXT_QUESTION = "NEXT_QUESTION"
export const PREVIOUS_QUESTION = "PREVIOUS_QUESTION"
export const LOAD_DECKS = "LOAD_DECKS"
export const SAVE_DECK  = "SAVE_DECK "
export const DELETE_DECK = "DELETE_DECK"
export const UPDATE_DECK = "UPDATE_DECK"
export const SAVE_QUESTION = "SAVE_QUESTION"


// export function sayHi(ola) {
//   return dispatch => {
//     client.query({
//       query: allPostsQuery
//     })
//     .then(response => {
//       console.log(response)
//       console.log(response.data.allPosts)
//       dispatch({ type: OI, ola: response.data.allPosts[0].description})
//     })
//     .catch(data => {
//       console.log(data)
//       dispatch({ type: OI, ola: "vixe"})
//     })
   
//   };
// }

export function loadDecks() {
 return dispatch => {
  // client.watchQuery({
  //   query: allDecksQuery,
  //   fetchPolicy: 'network-only'
  // }).result()

    client.query({
      query: allDecksQuery,
      fetchPolicy: 'network-only'
    })
    .then(response => {
      console.log("fetching decks...")
      response.data && dispatch({ type: LOAD_DECKS, decks: response.data.allDecks})
      
    })
    .catch(response => {
      console.log("errrrrrrroooo")
      console.log(response)
    })
   
  };
}

export function deckById(id) {
 return dispatch => {
    client.query({
      query: deckByIdQuery
    })
    .then(response => {
      dispatch({ type: LOAD_DECKS, decks: response.data.allDecks})
    })
    .catch(response => {
      console.log("eroooo")
      console.log(response)
    })
   
  };
}

export function saveQuestion({deck_id ,questionDescription, questionAnswer}) {

 return dispatch => {
  console.log("saving a question")
    client.mutate({
      mutation: createQuestionMutation,
      variables: { deck_id, questionDescription, questionAnswer}
    })
    .then(response => {
      dispatch({ type: SAVE_QUESTION, question: response.data.createQuestion}) //TODO atualizar o count na store
    })
    .catch(response => {
      console.log("errou quando tenta criar a questao")
      console.log(response)
    })
   
  };
}

export function saveDeck(deckTitle) {
 return dispatch => {
  console.log("aaqqqqiii")
    client.mutate({
      mutation: createDeckMutation,
      variables: { deckTitle: deckTitle }
    })
    .then(response => {
      console.log(response.data.createDeck)
      console.log("oooooi")
      dispatch({ type: SAVE_DECK, deck: response.data.createDeck})
    })
    .catch(response => {
      console.log("errrrroooo")
      console.log(response)
    })
   
  };
}

export const newDeck = () => ({
  type: NEW_DECK
})

export const newCard = () => ({
  type: NEW_CARD
})