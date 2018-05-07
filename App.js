import React, { Component } from 'react';
import Login from './screens/Login';
import reducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, SafeAreaView } from 'react-native';

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducers, middleware);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Login />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
