import React, { Component } from 'react';
import { View } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  {
    text: 'Welcome to Petder!',
    path: require('../assets/petder-bg3.png'),
    color: 'black',
    fontFamily: 'Zapfino',
    marginTop: 55,
    marginLeft: 35,
    marginRight: 10,
  },
  {
    text:
      'The Ultimate dating app that finds your soulmate with the help of your pets',
    path: require('../assets/petder-bg4.png'),
    color: 'white',
    fontFamily: 'Optima',
    marginTop: 185,
    marginLeft: 35,
    marginRight: 10,
  },
  {
    text:
      'Login, update your profile, then swipe away \n Let your pet determine your fate',
    path: require('../assets/petder-bg6.png'),
    fontFamily: 'Optima',
    color: 'white',
    marginTop: 115,
    marginLeft: 35,
    marginRight: 10,
  },
  {
    text: 'Matches are only steps away. Onwards with the pew!',
    path: require('../assets/petder-bg5.png'),
    color: '#416D10',
    fontFamily: 'Optima',
    marginTop: 185,
    marginLeft: 35,
    marginRight: 10,
  },
];

class Welcome extends Component {
  render() {
    return (
      <View>
        <Slides data={SLIDE_DATA} onComplete={this.props.onComplete} />
      </View>
    );
  }
}

export default Welcome;
