import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  color: {
    color: '#A8CA67',
  },
  logo: {
    width: 60,
    height: 45,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    backgroundColor: '#fff',
  },
  imgRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15,
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#A8CA67',
    textAlign: 'center',
    color: '#A8CA67',
    padding: 15,
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.75,
    borderRadius: 50,
  },
  cardDescription: {
    padding: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  border: {
    borderTopColor: '#bbb',
    borderTopWidth: 0.5,
  },
});

module.exports = styles;
