import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from "react-native-maps";
import { officials } from './officials';

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
      officials: [],
      loading: false
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
        try {
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
        catch{
          this.setState({ officials: [] })
        }
      }
      // Center the map on the location we just fetched.
    }

  }
  officials = (official, type) => {
    console.log(official.photoUrl)
    for (const item of official.channels) {
      if (item.type == 'Facebook') {
        var facebook = item.id
      }
      if (item.type == 'Twitter') {
        var twitter = item.id
      }
      if (item.type == 'YouTube') {
        var youtube = item.id
      }
    }
    var firstlast = official.name.split(" ")
    firstlast = (firstlast[0].length != 2 ? firstlast[0] : firstlast[1]) + " " + firstlast[firstlast.length - 1]
    console.log(firstlast)
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
            <Image source={{ uri: official.photoUrl != null ? official.photoUrl : officials[firstlast] == null ? official.photoUrl : 'http://bioguide.congress.gov/bioguide/photo/' + officials[firstlast].charAt(0) + '/' + officials[firstlast] + '.jpg' }} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 1.25, height: '100%' }}>
            <View style={{ flex: 3 }}>
              <View>
                <Text style={{ fontFamily: 'PoppinsM', fontSize: Math.min(10 * rem, 18 * wid) }}>{type}</Text>
              </View>
              <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>{official.phones ? official.phones[0] : "No number found"}</Text>
              <TouchableOpacity onPress={async () => official.urls ? await WebBrowser.openBrowserAsync(official.urls[0]) : alert("Sorry, a website couldn't be found")}>
                <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>View Site</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.vote(official.name, official.name)}>
                <Text style={{ fontFamily: 'PoppinsL', fontSize: Math.min(10 * rem, 18 * wid) }}>View Vote History</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={async () => youtube ? await WebBrowser.openBrowserAsync('https://www.youtube.com/user/' + youtube) : alert("Sorry, a youtube profile couldn't be found")}>
                <Image source={require('../assets/youtube.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
              <View style={{ flex: 0.15 }}></View>
              <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={async () => twitter ? await WebBrowser.openBrowserAsync('https://facebook.com/' + facebook) : alert("Sorry, a facebook profile couldn't be found")}>
                <Image source={require('../assets/facebook.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
              <View style={{ flex: 0.15 }}></View>
              <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={async () => twitter ? await WebBrowser.openBrowserAsync('https://twitter.com/' + twitter) : alert("Sorry, a twitter profile couldn't be found")}>
                <Image source={require('../assets/twitter.png')} style={{ width: '100%', height: '100%', flex: 1 }} resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.1 }}></View>
      </View >
    );
  }
  vote = async (name, offname) => {
    name = name.split(" ")
    console.log(name)
    if (name.length == 3) {
      name = (name[0].length != 2 ? name[0] : name[1]) + " " + name[name.length - 1]
    }
    else {
      name = name[0] + " " + name[1]
    }
    var id = officials[name]
    if (id == null) {
      alert("Sorry, unable to retrieve voting history for this official.")
    }
    else {
      this.setState({loading:true})
      let response = await fetch('https://api.propublica.org/congress/v1/members/' + id + '/votes.json', {
        headers: {
          'X-API-Key': 'WpG44Gi75vW020bamwbmW27o0d6OyAdrWcHq65uE'
        }
      });
      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        console.log(json)
        if (json.results){
        global.votes = json.results[0].votes;
        global.officialname = offname
        console.log(global.officialname)
        this.setState({loading: false})
        this.props.navigation.navigate('Votehistory')
        }
        else{
          alert("Sorry, unable to retrieve voting history for this official.")
        }

      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={'Getting voting history...'}
          textStyle={styles.spinnerTextStyle}
        />
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
        <ScrollView style={{ position: "absolute", top: entireScreenHeight * 0.93, left: 0, right: 0, height: 0.07 * entireScreenHeight }} scrollEnabled={false}>
            <View style={{ height: entireScreenHeight * 0.07, width: entireScreenWidth, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: entireScreenHeight * 0.005 }} onPress={() => this.props.navigation.navigate('Main')}>
                  <Text style={{ fontSize: Math.min(rem * 15, wid * 27), fontFamily: 'PoppinsL' }}>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
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