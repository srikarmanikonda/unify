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
      votes: global.votes
    };
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
            <View style = {{borderBottomColor: 'white', borderBottomWidth: 4, alignItems:'center' }}>
            <Text style = {{color:'white', fontFamily:'PoppinsM', fontSize:Math.min(rem*10,wid*18)}}>Voting history for</Text>
            <Text style = {{color:'white', fontFamily:'PoppinsM', fontSize:Math.min(rem*15,wid*27)}}>{global.officialname}</Text>
            </View>
          </View>
          <View style={{ flex: 4, width: '90%' }}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.votes}
              renderItem={({ item }) => (
                <View style={{ marginBottom: entireScreenHeight * 0.015, width: '100%', flexDirection: 'row', paddingBottom: entireScreenHeight * 0.01 }}>
                  <View style={{ alignItems: 'center', backgroundColor: 'grey', borderRadius: 15, flex: 3 }} key={item.billId}>
                    <View style={{ width: '90%', alignItems: 'center', }}>
                      <View style={{ borderBottomColor: 'white', borderBottomWidth: 4, }}>
                        <Text style={{ fontFamily: 'PoppinsM', fontSize: Math.min(15 * rem, 27 * wid), color: 'white', borderBottomColor: 'white' }}>Bill {item.bill.bill_id}</Text>
                      </View>
                      <View style={{ width: '100%' }}>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Voted on: {item.date}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Vote: </Text>
                          <Text style={{ color: item.position == 'Yes' ? 'green' : 'red', marginTop: '2%', fontFamily: 'PoppinsM' }}>{item.position.toUpperCase()}</Text>
                        </View>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Votes:</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>  Yes: {item.total.yes}</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>  No: {item.total.no}</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>  Abstain: {item.total.not_voting}</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Purpose:</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsL' }}>{item.bill.title == null ? item.description : item.bill.title}</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Roll Call #: {item.roll_call}</Text>
                        <Text style={{ color: 'white', marginTop: '2%', fontFamily: 'PoppinsM' }}>Result: {item.result}</Text>
                        <Text style={{ color: 'white' }}>{item.short_title}</Text>
                      </View>
                    </View>

                  </View>
                </View>
              )}
              keyExtractor={(item) => item.billId}
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