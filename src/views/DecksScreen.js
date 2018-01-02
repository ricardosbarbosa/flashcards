'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-native'

import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Button
} from 'react-native';
import { ListItem } from 'react-native-elements';
import DeckList from '../components/DeckList'

import { 
  loadDecks, newDeck
} from '../actions'

class DecksScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
    headerRight: <Button title="New Deck" onPress={() => {
      
      navigation.state.params.newDeck()
      navigation.navigate('NewDeck', {name: 'Lucy'})
    }}/>,
    // headerLeft: <Button title="Ola" onPress={() => navigation.state.params.sayHi("Ave maria")}/>,
  })

  componentDidMount () {
    const {setParams} = this.props.navigation;
    setParams({
      sayHi: this.props.sayHi,
      newDeck: this.props.newDeck
    })

    this.props.loadDecks()

  } 

  render() {
    const { decks , loadDecks} = this.props
    // console.log(decks)
    return (
      <DeckList
        onRefresh={loadDecks}
        navigation={this.props.navigation}
        decks={decks}
      />
    )
  } 

}

const mapStateToProps = (state, ownProps) => {
  return {
    decks: state.decks
  }
}

const mapDispatchToProps = { loadDecks, newDeck }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(DecksScreen)
