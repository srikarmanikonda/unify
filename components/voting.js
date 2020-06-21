import React, { Component } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends React.Component {
  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
  }
  one = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.usa.gov/register-to-vote');
  }
  two = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.fec.gov/help-candidates-and-committees/guides/');
  }
  three = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.eac.gov/election-officials/voting-accessibility');
  }
  four = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.fec.gov/data/elections/?state=&cycle=2020&election_full=true');
      }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <Text style={{ fontWeight: 'bold', fontSize: Math.min(32.5 * rem, 40.5 * wid), color: 'white',top:entireScreenWidth*-0.35,right:entireScreenWidth*0.01  }}>Voter Info</Text>

          <TouchableOpacity
            style={styles.login}
            onPress={() => this.one()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 21.5 * wid), color: 'white',top:entireScreenWidth*0.07,right:entireScreenWidth*0.01  }}>Voter Registration</Text>
            <Image style={{ width: '80%', height: '80%',right:entireScreenWidth*-0.31,top:entireScreenWidth*-0.03 }} source={require('../assets/ID.png')} resizeMode='contain'></Image>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login2}
            onPress={() => this.two()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 21.5 * wid,), color: 'white' ,top:entireScreenWidth*0.07 }}>FEC Guidelines</Text>
              <Image style={{ width: '80%', height: '80%',right:entireScreenWidth*-0.31,top:entireScreenWidth*-0.03 }} source={require('../assets/FEC_logo.png')} resizeMode='contain'></Image>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login3}
            onPress={() => this.three()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem,  21.5 * wid), color: 'white',top:entireScreenWidth*0.07  }}>Voting Assistance</Text>
            <Image style={{ width: '80%', height: '80%',right:entireScreenWidth*-0.31,top:entireScreenWidth*-0.03 }} source={require('../assets/hand.png')} resizeMode='contain'></Image>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login4}
            onPress={() => this.four()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem,  21.5 * wid), color: 'white' ,top:entireScreenWidth*0.07 }}>Elections near me</Text>
            <Image style={{ width: '80%', height: '80%',right:entireScreenWidth*-0.31,top:entireScreenWidth*-0.03 }} source={require('../assets/flag.png')} resizeMode='contain'></Image>

          </TouchableOpacity>
        </ImageBackground>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },
  login: {
    width: entireScreenWidth * 0.8,
    backgroundColor: "maroon",
    borderRadius: 25,
    height: entireScreenHeight * 0.09,
    alignItems: "center",
    justifyContent: "center",
    top: entireScreenHeight * -0.12
  },
  login2: {
    width: entireScreenWidth * 0.8,
    backgroundColor: "#3773BB",
    borderRadius: 25,
    height: entireScreenHeight * 0.09,
    alignItems: "center",
    justifyContent: "center",
    top: entireScreenHeight * 0.22
  },
  login3: {
    width: entireScreenWidth * 0.8,
    backgroundColor: "maroon",
    borderRadius: 25,
    height: entireScreenHeight * 0.09,
    alignItems: "center",
    justifyContent: "center",
    top: entireScreenHeight * -0.09
  },
  login4: {
    width: entireScreenWidth * 0.8,
    backgroundColor: "maroon",
    borderRadius: 25,
    height: entireScreenHeight * 0.09,
    alignItems: "center",
    justifyContent: "center",
    top: entireScreenHeight * 0.25
  }
});
