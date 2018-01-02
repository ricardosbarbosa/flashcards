'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View, 
  Button
} from 'react-native';

class DeckScreen extends Component {

  incrementQuestion() {
    const { deck } = this.props.navigation.state.params
    this.props.navigation.setParams({
      deck: {
        ...deck,
         _questionsMeta: {
          ...deck._questionsMeta,
          count: deck._questionsMeta.count + 1
        }
      }
    })
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

  state = {
    ready: false,
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.title}>{deck._questionsMeta.count} cards</Text>
        <Button title="Add Card" onPress={() => navigate('NewCard', {deck: deck, returnData: this.incrementQuestion.bind(this)})}/>
        <Button title="Start Quiz" onPress={() => navigate('Quiz', {deck: deck})}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#454545",
  }
});

export default DeckScreen;
