import React from 'react';
import MapView from "react-native-maps";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, Image, TouchableOpacity, Keyboard, ImageBackground, ScrollView, Animated } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Spinner from 'react-native-loading-spinner-overlay';

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
    this.state = {
      mapRegion: null,
      userlocation: null,
      officials: []
    };
  }
  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.05 }, location: { latitude: location.coords.latitude, longitude: location.coords.longitude } });
    var address = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    address = address[0]
    address = address.name + "," + address.city + ", " + address.region + " " + address.postalCode;
    console.log(address)
    const Http = new XMLHttpRequest();
    const url = 'https://www.googleapis.com/civicinfo/v2/representatives';
    var data = "?address=" + address + "&roles=legislatorUpperBody&roles=legislatorLowerBody" + "&key=AIzaSyA1E3rJw3phS6Vf1UCGYya3_eVl1TfSKjI";
    Http.open("GET", String(url + data));
    Http.send();
    var response;
    Http.onreadystatechange = (e) => {
      response = Http.responseText;
      if (Http.readyState == 4) {
        response = JSON.parse(response)
        let officials = []
        for (const item of response.offices) {
          if (item.name == 'U.S. Senator' || item.name == 'U.S. Representative') {
            for (const indice of item.officialIndices) {
              officials.push([response.officials[indice], item.name])
            }
          }
        }
        this.setState({ officials: officials })
        console.log(officials)
      }
      // Center the map on the location we just fetched.
    }
  }
  getofficials = async (latitude, longitude) => {
    var address = await Location.reverseGeocodeAsync({ latitude: latitude, longitude: longitude });
    address = address[0]
    address = address.name + "," + address.city + ", " + address.region + " " + address.postalCode;
    console.log(address)
    const Http = new XMLHttpRequest();
    const url = 'https://www.googleapis.com/civicinfo/v2/representatives';
    var data = "?address=" + address + "&roles=legislatorUpperBody&roles=legislatorLowerBody" + "&key=AIzaSyA1E3rJw3phS6Vf1UCGYya3_eVl1TfSKjI";
    Http.open("GET", String(url + data));
    Http.send();
    var response;
    Http.onreadystatechange = (e) => {
      response = Http.responseText;
      if (Http.readyState == 4) {
        response = JSON.parse(response)
        let officials = []
        for (const item of response.offices) {
          if (item.name == 'U.S. Senator' || item.name == 'U.S. Representative') {
            for (const indice of item.officialIndices) {
              officials.push([response.officials[indice], item.name])
            }
          }
        }
        this.setState({ officials: officials })
        console.log(officials)
      }
      // Center the map on the location we just fetched.
    }

  }
  officials = (official, type) => {
    console.log(official.photoUrl)
    return (
      <View key={official.name} style={[styles.card, { backgroundColor: official.party == 'Democratic Party' ? '#3773BB' : official.party == 'Republican Party' ? '#B22234' : '#cbcdd1' }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 4 }}>
            <Text style={{ fontFamily: 'PoppinsM', fontSize: Math.min(15 * rem, 27 * wid) }}>{official.name}</Text>
          </View>
        </View>
        <View style={{ flex: 0.1 }}></View>
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image source={{ uri: official.photoUrl }} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 1.25, height: '100%' }}>
            <View style={{ flex: 3 }}>
              <View>
                <Text style={{ fontFamily: 'PoppinsM', fontSize: Math.min(10 * rem, 18 * wid) }}>{type}</Text>
              </View>
              <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>{official.phones[0]}</Text>
              <TouchableOpacity>
                <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>View Site</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>View Vote History</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ flex: 1, width: '100%' }}>
                <Image source={require('../assets/youtube.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
              <View style={{ flex: 0.15 }}></View>
              <TouchableOpacity style={{ flex: 1, width: '100%' }}>
                <Image source={require('../assets/facebook.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
              <View style={{ flex: 0.15 }}></View>
              <TouchableOpacity style={{ flex: 1, width: '100%' }}>
                <Image source={require('../assets/twitter.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.1 }}></View>
      </View >
    );
  }
  render() {
    return (
      <View style={styles.container}>

        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.mapRegion}
          style={styles.container}
          onPress={(coordinate) => { this.getofficials(coordinate.nativeEvent.coordinate.latitude, coordinate.nativeEvent.coordinate.longitude) }}
        >
          {this.state.location != null ? <MapView.Marker coordinate={this.state.location} title="Your Location" pinColor='blue'></MapView.Marker> : null}
        </MapView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={entireScreenWidth * 0.9 * 1.115}
          disableIntervalMomentum={true}
          style={styles.scrollView}
        >
          {this.state.officials.map((data) => (
            this.officials(data[0], data[1])
          ))}
        </ScrollView>
      </View>
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
  card: {
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: entireScreenHeight * 0.3,
    width: entireScreenWidth * 0.9,
    overflow: "hidden",
    marginHorizontal: entireScreenWidth * 0.05,
    borderRadius: 25,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    bottom: entireScreenHeight * 0.07,
    paddingVertical: 0,

  },
});