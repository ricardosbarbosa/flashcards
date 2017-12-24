'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View, 
  Button
} from 'react-native';

class QuizScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

  state = {
    questions: [],
    questionIndex: 0,
    correctTotal: 0,
    viewingQuestion: true
  }

  componentDidMount () {
    const { deck } = this.props.navigation.state.params;
    this.setState({
      questions: deck.questions,
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.props.navigation.state.params;
    const { questions, questionIndex, viewingQuestion } = this.state

    console.log(viewingQuestion)
   
    return (
      <View style={styles.container}>

        { 
          this.state.viewingQuestion ? 
          <View style={styles.container}> 
            <Text style={styles.title}>question</Text>
            <Button title="View Answer" onPress={() => this.setState({viewingQuestion : false})}/>
          </View>
          :
          <View style={styles.container}> 
            <Text style={styles.title}>answer</Text>
            <Button title="View Question"  onPress={() => this.setState({viewingQuestion : true})}/>

            <Button title="Correct" onPress={() => navigate('AddCard', {name: 'Lucy'})}/>
            <Button title="Incorrect" onPress={() => navigate('Quiz', {name: 'Lucy'})}/>
          </View>
        }
        
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

export default QuizScreen;
