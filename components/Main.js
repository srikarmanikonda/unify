import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Spinner from 'react-native-loading-spinner-overlay';
import CountDown from 'react-native-countdown-component';
import * as firebase from 'firebase';

// used for scaling
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
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.replace('Login')

    } catch (e) {
        console.log(e);
    }
}
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
          <View style={styles.container}>

            <View style={{ flex: 1.5, width: '85%', marginTop: getStatusBarHeight(), justifyContent: 'center', alignItems:'center' }}>
            <CountDown
              until={11750000}
              size={38}
              style={{alignItems:'center', justifyContent:'center',left:wid*7,top:rem*10}}
              onFinish={() => alert('Its election day! Go vote!')}
              digitStyle={{ backgroundColor: '#FFF' }}
              digitTxtStyle={{ color: 'maroon' }}
              timeToShow={['D', 'H', 'M', 'S']}
              timeLabels={{ d: 'days', h: 'hours', m: 'minutes', s: 'seconds' }}
              timeLabelStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            </View>
            <View style={{ flex: 3, width: '90%' }}>
              <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
                <View style={{
                  flex: 1, height: '85%',
                }}>
                  <TouchableOpacity style={{
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 3.65,

                    elevation: 8,
                  }} onPress={() => this.props.navigation.navigate('Research')}>
                    <View
                      style={{ height: '100%', alignItems: 'center', borderRadius: 20, width: '100%', justifyContent: 'center', backgroundColor: '#3773BB' }}>
                      <View style={{ flex: 0.2, width: '100%' }}></View>
                      <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Research</Text>
                      </View>
                      <View style={{ flex: 3, width: '100%' }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/magnify.png')} resizeMode='contain'></Image>
                      </View>
                      <View style={{ flex: 1, width: '100%' }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.15, height: '95%' }}></View>
                <View style={{
                  flex: 1, height: '85%',
                }}>
                  <TouchableOpacity style={{
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 3.65,

                    elevation: 8,
                  }} onPress={() => this.props.navigation.navigate('Forum')}>
                    <View
                      style={{ height: '100%', alignItems: 'center', borderRadius: 20, width: '100%', justifyContent: 'center', backgroundColor: '#B22234' }}>
                      <View style={{ flex: 0.2, width: '100%' }}></View>
                      <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text onPress={() => this.props.navigation.navigate('Chat')} style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Forum</Text>
                      </View>
                      <View style={{ flex: 3, width: '100%' }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/chat.png')} resizeMode='contain'></Image>
                      </View>
                      <View style={{ flex: 1, width: '100%' }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 0.05 }}></View>
              <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
                <View style={{
                  flex: 1, height: '85%',
                }}>
                  <TouchableOpacity style={{
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 3.65,

                    elevation: 8,
                  }} onPress={() => this.props.navigation.navigate('Bills')}>
                    <View
                      style={{ height: '100%', alignItems: 'center', borderRadius: 20, width: '100%', justifyContent: 'center', backgroundColor: '#B22234' }}>
                      <View style={{ flex: 0.2, width: '100%' }}></View>
                      <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Bill Tracker</Text>
                      </View>
                      <View style={{ flex: 3, width: '100%' }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/documents.png')} resizeMode='contain'></Image>
                      </View>
                      <View style={{ flex: 1, width: '100%' }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.15, height: '95%' }}></View>
                <View style={{
                  flex: 1, height: '85%',
                }}>
                  <TouchableOpacity style={{
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 3.65,

                    elevation: 8,
                  }} onPress={() => this.props.navigation.navigate('Voting')}>

                    <View
                      style={{ height: '100%', alignItems: 'center', borderRadius: 20, width: '100%', justifyContent: 'center', backgroundColor: '#3773BB' }}>
                      <View style={{ flex: 0.2, width: '100%' }}></View>
                      <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: Math.min(12.5 * rem, 22.5 * wid), color: 'white' }}>Voter Info</Text>
                      </View>
                      <View style={{ flex: 3, width: '100%' }}>
                        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/vote.png')} resizeMode='contain'></Image>
                      </View>
                      <View style={{ flex: 1, width: '100%' }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 0.2, width: '100%' }}>
                <TouchableOpacity       onPress={() => this.signOutUser()}>

              <Image style={{ width: '100%', height: '100%' }} source={require('../assets/signout.png')} resizeMode='contain'></Image>
              </TouchableOpacity>
              </View>
              <View style={{ flex: 0.1, width: '100%' }}>

              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );

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
});
