'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-native'
import {
  StyleSheet,
  Text,
  View, 
  // Button,
  TouchableOpacity, Easing
} from 'react-native';
import {Button} from 'react-native-elements'
import FlipView from 'react-native-flip-view-next';
import {deckById} from '../actions'

import { purple, red, orange, blue, lightPurp, pink, white } from '../utils/colors'

class QuizScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

 constructor(props, context) {
    super(props, context)
    this.state = {
      questionIndex: 0,
      correctTotal: 0,
      isFlipped: false
    }
  }
  

  componentDidMount () {
    const { deck } = this.props.navigation.state.params;
    this.props.deckById(deck.id)
  }

  render() {
    const { deck } = this.props;
    return (
      
      deck && deck.questions &&
      <View style={{flex: 1}} > 
          <Text style={styles.number_of_questions}>
            {this.state.questionIndex + 1} de {deck.questions.length}
          </Text>
          <FlipView style={{flex: 1}}
                front={this._renderFront()}
                back={this._renderBack()}
                isFlipped={this.state.isFlipped}
                onFlipped={(val) => {console.log('Flipped: ' + val);}}
                flipAxis="y"
                flipEasing={Easing.out(Easing.ease)}
                flipDuration={100}
                perspective={1000}/>
        
      </View>

    )
  }

  _renderFront = () => {
    
    const { deck } = this.props
    return (
      
      deck && deck.questions && deck.questions[this.state.questionIndex] &&
        <View style={styles.container}> 
          <View style={{flex: 1, height: 100, width: 100,justifyContent: 'center', alignItems: 'center'}}> 
            <Text style={styles.title} >{deck.questions[this.state.questionIndex].question}</Text>  
          </View>
          
          <Button 
            style={{margin: 10, fontSize: 32}} 
            title="View Answer!" 
            onPress={this._flip}
            large
            borderRadius="5"
            backgroundColor='#f26f28'
            icon={{name: 'eye-slash', type: 'font-awesome',}}/>
        </View>
      
     
    );
  };

  _renderBack = () => {
    const { deck } = this.props
    const { navigate } = this.props.navigation;
    return (
      
        deck && deck.questions && deck.questions[this.state.questionIndex] &&
        <View style={styles.container}> 
          <View style={{flex: 1, height: 100, width: 100,justifyContent: 'center', alignItems: 'center'}}> 
            <Text style={styles.title}>{deck.questions[this.state.questionIndex].answer}</Text>
          </View>
          
          <View style={styles.button_container}> 
            
            <Button 
              title="Correct" 
              onPress={this._correct} 
              large
              borderRadius="5"
              backgroundColor='#4e4cb8'
              icon={{name: 'check', type: 'font-awesome',}} />

            <Button 
              title="Incorrect" 
              onPress={this._incorrect}
              large
              borderRadius="5"
              backgroundColor='#b71845'
              icon={{name: 'times', type: 'font-awesome',}} />

          </View>

          <Button 
            style={{margin: 10, fontSize: 32}} 
            title="View Question!" 
            onPress={this._flip}
            large
            borderRadius="5"
            backgroundColor='#f26f28'
            icon={{name: 'eye', type: 'font-awesome',}} />
        </View>
    );
  };

  _correct = () => {
    if(this.state.questionIndex === (this.props.deck.questions.length - 1)) {
      this.setState({ 
        correctTotal: this.state.correctTotal + 1,
        questionIndex: this.state.questionIndex + 1
      })
      this._go( ((this.state.correctTotal + 1) / this.props.deck.questions.length) * 100 )
    }
    else {
      this.setState({ 
        correctTotal: this.state.correctTotal + 1,
        questionIndex: this.state.questionIndex + 1
      })
      this._flip()
    }
  };

  _go = (score) => {
    const { navigate } = this.props.navigation;
    navigate('QuizResult', {deck: this.props.deck, result: score.toFixed(2)})
  }

  _incorrect = () => {
    if(this.state.questionIndex === (this.props.deck.questions.length - 1)) {
      this._go( (this.state.correctTotal / this.props.deck.questions.length) * 100 )
    }
    else {
      this.setState({ 
        questionIndex: this.state.questionIndex + 1
      })
      this._flip()
    }
  };

  _flip = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '81D4FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#454545",
    fontSize: 35,
  },
  button_container: {
    justifyContent: 'space-between',
    display: 'flex',  
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  number_of_questions: {
    fontSize: 20,
    textStyle: 'bold',
    color: "#454545",
    margin: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    // decks: state.decks
    deck: state.deck
  }
}

const mapDispatchToProps = { deckById }


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(QuizScreen)
