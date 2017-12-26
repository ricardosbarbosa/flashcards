'use strict';

import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const allPostsQuery = gql`
  query {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }`

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ITEM_HEIGHT = 48;
const ITEM_AND_SEPARATOR_HEIGHT = ITEM_HEIGHT + (Platform.OS === 'ios') ? Dimensions.hairlineWidth : 0;

class ItemList extends React.PureComponent {

  _scrollPos = new Animated.Value(0);
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  _onPressItem = (deck) => {
    this.props.navigation.navigate('Deck', {
      deck,
    });
  };

  _onRefresh = () => {
    // Kick off a request to get new data here.
  };

  _renderItem = ({item}) => {
    if (Platform.OS === 'ios') {
      return (
        <ListItem
          key={item.key}
          onPress={() => this._onPressItem(item)}
          title={item.title}
          subtitle={`${item.questions.length} Cards`}
          underlayColor="#d9d9d9"
        />
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => this._onPressItem(item)}>
          <View style={styles.item}>
            <Text style={styles.itemKey}>{item.key}</Text>
            <Text style={styles.itemTitle}>{item.title} - {`${item.questions.length} Cards`}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  render() {
    return (
      <AnimatedFlatList
        data={this.props.items}
        getItemLayout={(data, index) => ({
          length: ITEM_AND_SEPARATOR_HEIGHT,
          offset: ITEM_AND_SEPARATOR_HEIGHT * index,
          index
        })}
        numColumns={1}
        onRefresh={this._onRefresh}
        onScroll={this._scrollSinkY}
        refreshing={false}
        renderItem={this._renderItem}
        style={styles.list}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 8,
      },
    }),
  },
  item: {
    width: Dimensions.get('window').width,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
  },
  itemKey: {
    margin: 16,
    fontSize: 14,
  },
  itemTitle: {
    margin: 16,
    fontSize: 14,
  },
});

export default graphql(allPostsQuery, {name: 'allPostsQuery'})(ItemList)
