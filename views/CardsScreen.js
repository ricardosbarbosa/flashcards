'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const CardsScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{navigation.state.params.item.title}</Text>
  </View>
)

CardsScreen.navigationOptions = {
  title: 'Detail',
};

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

export default CardsScreen;
