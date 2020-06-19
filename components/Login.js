import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Google from "expo-google-app-auth";

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    loading: false,
    uname:''
  }
  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
  }

  signInWithGoogle = async () => {

    const result = await Google.logInAsync({
      iosClientId: "400546646665-8en50d9jelhlcijqkkes4euo0ekhhguh.apps.googleusercontent.com",
      androidClientId: "400546646665-5cm0tfjdfuejb8r0gncvlr0kg8pfn2m3.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
    //  console.log("LoginScreen.js.js 21 | ", result.user.givenName);
       //after Google login redirect to Profile
      var uname  = result.user.givenName + " " + result.user.familyName;
         
          AsyncStorage.setItem('username', uname);
          console.log(uname)
          this.setState({ loading: false });
          //this.props.navigation.replace('Main')

          this.setState({ loading: false });

   // this.props.navigation.replace("Main", {username:result.user.givenName});

      return result.accessToken;
    } else {
      return { cancelled: true };
    }
    

};


  render() {
    const onPress = () => {
      this.signInWithGoogle();
      
    }
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={styles.container}>
          <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
            <Spinner
              visible={this.state.loading}
              textContent={'Logging In...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={{ flex: 1.5, width:'100%', alignItems: 'center', justifyContent: 'center', }}>
              <View style={{ width: '100%', height: '80%', marginTop: '15%'}}>
                <Image style={{ width: '100%', height: '100%' }} source={require('../assets/logo.png')} resizeMode='contain'></Image>
              </View>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', width: '100%' }}></View>
            <View style={{ flex: 1.5, width: '85%', alignItems: 'flex-end', justifyContent: 'center' }}>
              <View style={{ width: '100%', height: '80%', alignItems: 'flex-end', justifyContent: 'center' }}>
                <View style={{
                  width: '100%',
                  flex: 1.5,
                  borderColor: '#000000',
                  borderWidth: 2,
                  borderRadius: 15,
                  backgroundColor:'white'
                }}>
                  <TextInput
                    style={{ fontSize: 12 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'PoppinsL' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="First Name"
                    placeholderTextColor="#4F4F4F"
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChangeText={(value) => this.setState({ firstname: value })}
                    value={this.state.firstname}

                  /></View>
                <View style={{ width: '100%', flex: 1 }}></View>
                <View style={{
                  width: '100%',
                  flex: 1.5,
                  borderColor: '#000000',
                  borderWidth: 2,
                  borderRadius: 15,
                  backgroundColor:'white'
                }}>
                  <TextInput
                    style={{ fontSize: 12 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'PoppinsL' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Last Name"
                    placeholderTextColor="#4F4F4F"
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChangeText={(value) => this.setState({ lastname: value })}
                    value={this.state.lastname}

                  />
                </View>
                <View style={{ width: '100%', flex: 1 }}></View>

              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
              <View style={{ width: '100%', height: '90%', alignItems: 'center' }}>
                <TouchableOpacity style={{
                  height: '44%', width: '60%', borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.30,
                  shadowRadius: 3.65,

                  elevation: 8,
                }} onPress={() => this.signup()}>
                  <View
                    style={{ height: '100%', alignItems: 'center', borderRadius: 30, width: '100%', justifyContent: 'center', backgroundColor: '#F3F3F3' }}>
                    <Text style={{ color: 'black', fontSize: Math.min(25 * rem, 45 * wid), textAlign: 'center', fontWeight: 'bold', fontFamily: 'PoppinsM' }}>Login</Text>
                  </View>
                  <TouchableOpacity onPress={onPress}>
                  <Text style={styles.link}>Sign in with Google</Text>
                </TouchableOpacity>
                </TouchableOpacity>
                
              </View>
              
            </View>
            
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView >
    );

  }
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize:25*wid,
    //fontFamily:'WSB',
    marginTop:'5%'
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAF8FF'
  },
  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },
});