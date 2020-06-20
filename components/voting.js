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
    return(
      <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
      <TouchableOpacity
        style = {styles.login}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Voter Info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {styles.login2}>
            <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Voter Info</Text>
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
    top:entireScreenHeight*0.00001
  },
  login2:{
  width:entireScreenWidth*0.8,
    backgroundColor:"maroon",
    borderRadius:25,
    height:entireScreenHeight*0.09,
    alignItems:"center",
    justifyContent:"center",
    top:entireScreenHeight*0.00001
  }
});
