import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './views/MainNavigator';

// apollo imports
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

import { nativeHistory, Route, NativeRouter, } from 'react-router-native'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

const store = configureStore()


const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjbksvgjy0y6w0171i6nujizx' }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client} >
          <NativeRouter history={nativeHistory}>
            <Route path="/" component={MainNavigator} />
          </NativeRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
