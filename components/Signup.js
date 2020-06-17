import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    loading: false,
  }
  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
  }

  render() {
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
                    style={{ fontSize: 10 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'PoppinsL' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Username"
                    placeholderTextColor="#4F4F4F"
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChangeText={(value) => this.setState({ firstname: value })}
                    value={this.state.username}

                  /></View>
                <View style={{ width: '100%', flex: 1.25 }}></View>
                <View style={{
                  width: '100%',
                  flex: 1.5,
                  borderColor: '#000000',
                  borderWidth: 2,
                  borderRadius: 15,
                  backgroundColor:'white'
                }}>
                  <TextInput
                    style={{ fontSize: 10 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'PoppinsL' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Password"
                    placeholderTextColor="#4F4F4F"
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChangeText={(value) => this.setState({ lastname: value })}
                    value={this.state.password}
                    secureTextEntry={true}

                  />
                </View>
                <View style={{ width: '100%', flex: 1.25 }}></View>

              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
              <View style={{ width: '100%', height: '90%', alignItems: 'center' }}>
                <TouchableOpacity style={{
                  height: '44%', width: '50%', borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.30,
                  shadowRadius: 3.65,

                  elevation: 8,
                }} onPress={() => this.signup()}>
                  <View
                    style={{ height: '100%', alignItems: 'center', borderRadius: 30, width: '100%', justifyContent: 'center', backgroundColor: '#F3F3F3' }}>
                    <Text style={{ color: 'black', fontSize: Math.min(20 * rem, 36 * wid), textAlign: 'center', fontWeight: 'bold', fontFamily: 'PoppinsM' }}>Signup</Text>
                  </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row', marginTop:5*rem}}>
                <Text style={{color: 'white', fontSize:15*wid,fontFamily:'PoppinsL', textShadowColor:'black', textShadowRadius:10, textShadowOffset:{width: -1, height: 1}}}>Have an account? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{color: '#00FFFF', fontSize:15*wid,fontFamily:'PoppinsM', textShadowColor:'black', textShadowRadius:10, textShadowOffset:{width: -1, height: 1}}}>Log in</Text>
                </TouchableOpacity>
              </View>
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