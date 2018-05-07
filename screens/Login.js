import React from 'react';
import styles from '../styles';
import RootNavigator from '../navigation/RootNavigator';
import Welcome from './Welcome';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase';
firebase.initializeApp(firebaseConfig);

import { View, Alert } from 'react-native';

class Login extends React.Component {
  state = {};

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.props.dispatch(login(user));
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '2069757699907384',
      {
        permissions: ['public_profile'],
      }
    );
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log(error);
          Alert.alert('Try Again');
        });
    }
  };

  render() {
    if (this.props.loggedIn) {
      return <RootNavigator />;
    } else {
      return (
        <View style={[styles.container, styles.center]}>
          <Welcome onComplete={this.login.bind(this)} />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(Login);
