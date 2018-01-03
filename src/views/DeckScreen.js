'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View, 
  Button as ButtonNative
} from 'react-native';
 import {Button} from 'react-native-elements'
import { red, orange, blue, lightPurp, pink, white } from '../utils/colors'
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
    headerRight: <ButtonNative title="Add Card" onPress={() => {
      
      navigation.navigate('NewCard', {deck: navigation.state.params.deck, returnData: navigation.state.params.incrementQuestion})
    }}/>,
  })

  componentDidMount () {
    const {setParams} = this.props.navigation;
    setParams({
      incrementQuestion: this.incrementQuestion.bind(this)
    })
  } 

  state = {
    ready: false,
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{deck._questionsMeta.count} cards</Text>
        
        <Button 
          hidden={deck._questionsMeta.count === 0}
          style={{margin: 10}}
          title="Start Quiz" 
          onPress={() => navigate('Quiz', {deck: deck})}
          large
          borderRadius="5"
          backgroundColor="#397af8"
          icon={{name: 'play', type: 'font-awesome',}}/>
         
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
    padding: 10
  },
  title: {
    fontSize: 40, 
    color: "#454545",
  },
  subtitle: {
    fontSize: 30, 
    color: "#ababab",
  },
  button: {
    padding: 10,
    backgroundColor: orange,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
    fontSize: 20, 
  },
});

export default DeckScreen;
