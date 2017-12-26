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
import ItemList from '../components/ItemList'

import { sayHi } from '../actions'

class DecksScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
    headerRight: <Button title="New Deck" onPress={() => navigation.navigate('NewDeck', {name: 'Lucy'})}/>,
    headerLeft: <Button title="Ola" onPress={() => navigation.state.params.sayHi("Ave maria")}/>,
  })

  componentDidMount () {
    const {setParams} = this.props.navigation;
    setParams({
      sayHi: this.props.sayHi
    })

  }

  render() {
    return (
      <ItemList
        navigation={this.props.navigation}
        items={[
          {title: `${this.props.oi}`, key: '1', questions: [{question: 'What is React?',answer: 'A library for managing user interfaces'}]},
          {title: 'Item 2', key: '2', questions: []},
          {title: 'Item 3', key: '3', questions: []},
          {title: 'Item 4', key: '4', questions: []},
          {title: 'Item 5', key: '5', questions: []},
          {title: 'Item 6', key: '6', questions: []},
          {title: 'Item 7', key: '7', questions: []},
          {title: 'Item 8', key: '8', questions: []},
          {title: 'Item 9', key: '9', questions: []},
          {title: 'Item 10', key: '10', questions: []},
          {title: 'Item 11', key: '11', questions: []},
          {title: 'Item 12', key: '12', questions: []},
          {title: 'Item 13', key: '13', questions: []},
          {title: 'Item 14', key: '14', questions: []},
          {title: 'Item 15', key: '15', questions: []},
          {title: 'Item 16', key: '16', questions: []},
          {title: 'Item 17', key: '17', questions: []},
          {title: 'Item 18', key: '18', questions: []},
          {title: 'Item 19', key: '19', questions: []},
          {title: 'Item 20', key: '20', questions: []},
          {title: 'Item 21', key: '21', questions: []},
          {title: 'Item 22', key: '22', questions: []},
          {title: 'Item 23', key: '23', questions: []},
          {title: 'Item 24', key: '24', questions: []},
          {title: 'Item 25', key: '25', questions: []},
        ]}
      />
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    oi: state.oi,
  }
}

const mapDispatchToProps = { sayHi }


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(DecksScreen)
