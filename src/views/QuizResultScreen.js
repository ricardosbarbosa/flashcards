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

class QuizResultScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

  render() {
    const { navigate } = this.props.navigation;
    const { deck, result } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>

        <Text style={styles.title}>{result}%</Text>

        <View style={{flexDirection: 'row'}}>
          <Button   
            style={{margin: 5}}
            title="Restart Quiz" 
            onPress={() => navigate('Quiz', {deck: deck} )}
            large
            borderRadius="5"
            backgroundColor="#f26f28"
            icon={{name: 'repeat', type: 'font-awesome',}}/>

          <Button 
            title="Back to Deck" 
            onPress={() => navigate('Deck', {deck: deck})}
            large
            borderRadius="5"
            backgroundColor="#f26f28"
            icon={{name: 'id-card-o', type: 'font-awesome',}}/>
         </View>
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
    padding: 10,
    
  },
  title: {
    fontSize: 80, 
    color: "#454545",
    padding: 10
  },
  button: {
    padding: 10,
    backgroundColor: orange,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 10,
    fontSize: 20, 
  },
});


export default QuizResultScreen
