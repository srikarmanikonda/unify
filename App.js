import React from 'react';
import { Text, TextInput } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import login from './components/Login';



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
    await Font.loadAsync({
      'PoppinsL': require('./assets/fonts/Poppins-Light.ttf'),
      'PoppinsM': require('./assets/fonts/Poppins-Medium.ttf'),
    });
    this.setState({ assetsLoaded: true })
  }
  render() {
    if (!this.state.assetsLoaded) {
      return null;
    }
    const AppNavigator = createStackNavigator({
      Login: {
        screen: login
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