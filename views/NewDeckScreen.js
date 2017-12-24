'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View, 
  Button,
  TextInput
} from 'react-native';

class NewDeckScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      name: ''
    };
  }

  componentDidMount () {
    
  }

  render() {
    return (
      <View style={styles.container}>
         <TextInput style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}} placeholder='Name the deck'
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
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

export default NewDeckScreen;
