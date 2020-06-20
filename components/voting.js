import React,{ Component} from 'react';
import * as WebBrowser from 'expo-web-browser';
import { FlatList,StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
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
  render(){
      async function one(){
        let result = await WebBrowser.openBrowserAsync('https://www.usa.gov/register-to-vote');
      }
      async function two(){
        let result = await WebBrowser.openBrowserAsync('https://www.fec.gov/help-candidates-and-committees/guides/');
      }
      async function three(){
        let result = await WebBrowser.openBrowserAsync('https://www.eac.gov/election-officials/voting-accessibility');
      }
    return(
      <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
      <TouchableOpacity
        style = {styles.login}
        onPress = {()=> one()}
>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Voter Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.login2}
          onPress = {()=> two()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>FEC Guidelines</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.login3}
          onPress = {()=> three()}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Voting Assistance + accessibility</Text>
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
  login:{
  width:entireScreenWidth*0.8,
    backgroundColor:"maroon",
    borderRadius:25,
    height:entireScreenHeight*0.09,
    alignItems:"center",
    justifyContent:"center",
    top:entireScreenHeight*-0.2
  },
  login2:{
  width:entireScreenWidth*0.8,
    backgroundColor:"#3773BB",
    borderRadius:25,
    height:entireScreenHeight*0.09,
    alignItems:"center",
    justifyContent:"center",
    top:entireScreenHeight*0.31
  },
  login3:{
  width:entireScreenWidth*0.8,
    backgroundColor:"maroon",
    borderRadius:25,
    height:entireScreenHeight*0.09,
    alignItems:"center",
    justifyContent:"center",
    top:entireScreenHeight*-0.09
  }
});