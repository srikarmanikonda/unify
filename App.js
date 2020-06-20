import React from 'react';
import { Text, TextInput, Image } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import { Asset } from 'expo-asset';
import login from './components/Login';
import signup from './components/Signup';
import main from './components/Main';
import research from './components/Research';
import loading from './components/Loading';


import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyA6jm4u7jyD9ofrKr4D6HzElN27FKkHiUA",
  authDomain: "drivetime-ce314.firebaseapp.com",
  databaseURL: "https://drivetime-ce314.firebaseio.com",
  projectId: "drivetime-ce314",
  storageBucket: "drivetime-ce314.appspot.com",
  messagingSenderId: "124667229118",
  appId: "1:124667229118:web:97be36df1399fa418fffef",
  measurementId: "G-ZGWS3MZ6WJ"
};
firebase.initializeApp(firebaseConfig);
export default class AppContainer extends React.Component {
  state = {
    assetsLoaded: false,
  };

  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  async componentDidMount() {
    await Asset.loadAsync([
      require('./assets/background.jpg'),
  ]);
    await Font.loadAsync({
      'PoppinsL': require('./assets/fonts/Poppins-Light.ttf'),
      'PoppinsM': require('./assets/fonts/Poppins-Medium.ttf'),
    });
    this.setState({ assetsLoaded: true })
  }


  render() {
    if (!this.state.assetsLoaded) {
      return null; // wait until fonts and images are loaded
    }
    const AppNavigator = createStackNavigator({
      Login: {
        screen: login
      },
      Signup: {
        screen: signup
      },
      Main: {
        screen: main
      },
      Research: {
        screen: research
      },
      Loading: {
        screen: loading
      },
    },
      {
        initialRouteName: 'Login',
        headerMode: 'none'
      });

    const AppContainer = createAppContainer(AppNavigator);
    return (<AppContainer />);
  }
}