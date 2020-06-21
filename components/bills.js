import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { List, ListItem, SearchBar } from "react-native-elements";
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    //I shabatted rahul if u see this in the morining please help. idk what im even doing in terms of this
    this.state = {
      bills: []
    };
  }
  _renderMyKeyExtractor = (item, index) => item.id.toString();

  componentDidMount() {
    this.url()
  }
  url = async () => {
    let response = await fetch('https://api.propublica.org/congress/v1/116/house/bills/introduced.json', {
      headers: {
        'X-API-Key': 'WpG44Gi75vW020bamwbmW27o0d6OyAdrWcHq65uE'
      }
    });
    //oh  ok got it
    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      var bills = json.results[0].bills
      var data = []
      for (var i = 0; i < bills.length; i++) {
        data.push(bills[i])
      }
      this.setState({ bills: data })
      console.log(bills)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }
  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <View style={styles.container}>
          <View style={{ flex: 1, width:'100%', justifyContent:'center', alignItems:'center' }}>
            <View style = {{borderBottomColor: 'white', borderBottomWidth: 4, alignItems:'center' }}>
            <Text style = {{color:'white', fontFamily:'PoppinsM', fontSize:Math.min(rem*20,wid*36)}}>Recent Bills</Text>
            </View>
          </View>
          <View style={{ flex: 4, width:'90%' }}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.bills}
              renderItem={({ item }) => (
                <View style={{ alignItems: 'center', marginBottom: entireScreenHeight * 0.015, width: '100%', backgroundColor: item.sponsor_party == 'D' ? '#3773BB' : '#B22234', paddingBottom:entireScreenHeight*0.01, borderRadius:15 }} key={item.billId}>
                  <View style = {{width:'90%', alignItems:'center'}}>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 4, }}>
                      <Text style={{ fontFamily: 'PoppinsM', fontSize: Math.min(15 * rem, 27 * wid), color: 'white', borderBottomColor: 'white' }}>Bill {item.bill_slug}</Text>
                    </View>
                    <View style = {{width:'100%'}}>
                      <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Introduced on: {item.introduced_date}</Text>
                      <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Introduced by: {item.sponsor_title} {item.sponsor_name}, {item.sponsor_state} - {item.sponsor_party}</Text>
                      <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Purpose:</Text>
                      <Text style={{ color: 'white' }}>{item.short_title}</Text>
                      <TouchableOpacity onPress={async () => item.govtrack_url ? await WebBrowser.openBrowserAsync(item.govtrack_url) : alert("Sorry, a website couldn't be found")}>
                      <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>More Info</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.bill_id}
            />
          </View>
        </View>
      </ImageBackground>
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
});