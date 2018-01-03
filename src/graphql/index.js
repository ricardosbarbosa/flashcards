// import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


export const allDecksQuery = gql`
  query {
    allDecks(orderBy: createdAt_DESC) {
      id
      title
      _questionsMeta {
        count
      }
    }
  }`


export const deckByIdQuery = gql`
  query deckByIdQuery($id: ID!){
    
    allDecks(filter: {id: $id}) {
      id
      owner {
        id
      }
      _questionsMeta {
        count
      }
      questions {
        id
        question
        answer
      }
      title
    }
  }`

// createQuestionMutation
// createQuestion(answer:"R. oi", question:"ola?", deckId:"cjbpnkt8kg5ct0117071z0su1"){
//     id
//   }


export const createQuestionMutation = gql`
  mutation createDeckMutation($deck_id: ID!, $questionDescription: String!, $questionAnswer: String!) {
    createQuestion(
      deckId: $deck_id, 
      question: $questionDescription, 
      answer: $questionAnswer, 
    ) {
        id
        deck {
          id
        }
      }
  }`

export const createDeckMutation = gql`
  mutation createDeckMutation($deckTitle: String!) {
    createDeck(
      ownerId: "cjbktezcy07kf0114l61urm6f", 
      title: $deckTitle, 
      questions: []
    ) {
        id
        title
        _questionsMeta {
          count
        }
      }
  }`