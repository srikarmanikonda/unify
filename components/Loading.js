import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, } from "react-native";
import { SplashScreen } from 'expo';
import * as firebase from "firebase";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.replace(user ? "Main" : "Login")
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined }}
            source={require('../assets/splash.png')}
            fadeDuration={0}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});