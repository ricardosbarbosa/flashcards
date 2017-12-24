'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View, 
  Button,
  TextInput
} from 'react-native';

class NewCardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      question: '',
      answer: '',
    };
  }

  componentDidMount () {
    
  }

  render() {
    return (
      <View style={styles.container}>
         <TextInput style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}} placeholder='Type the question'
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}} placeholder='Type the answer'
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <Button title="Submit" onPress={() => this.props.navigation.navigate('AddCard', {name: 'Lucy'})}/>
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

export default NewCardScreen;
