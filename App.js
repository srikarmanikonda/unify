import React from 'react';
import { Text, TextInput, Image } from 'react-native';
import * as Font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import { Asset } from 'expo-asset';
import login from './components/Login';
import signup from './components/Signup';



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
      return null;
    }
    const AppNavigator = createStackNavigator({
      Login: {
        screen: login
      },
      Signup: {
        screen: signup
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