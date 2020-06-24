import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navigator from './src/controller/routes/homeStack'
import Home from './src/view/screens/home'

export default class App extends React.Component {

  render() {
    return (
      <Navigator />
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
  tileDestiny: {
    margin: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#84DCC6'
  },
  tileOrigin: {
    margin: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0fbfc'
  },
  tileBlocker: {
    margin: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD6D7'
  },
  tileGrid: {
    margin: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6081A9'
  },
  tilePath: {
    margin: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006636'
  },
  button: {
    width: 100,
    height: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A0',
    borderRadius: 10,
    textDecorationColor: '#FFF',
  },
  tile: {
    margin: 2,
    width: 30,
    height: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
