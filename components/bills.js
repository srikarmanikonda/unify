import React,{ Component} from 'react';
import { FlatList,StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,Dimensions, Image, TextInput, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { List, ListItem, SearchBar } from "react-native-elements";
global.data = []
global.bills = null
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:global.bills
    };
  }
  _renderMyKeyExtractor=(item,index)=>item.id.toString();

  render() {
    async function   url(){
      const fetch = require("node-fetch");
      let response = await fetch('https://api.propublica.org/congress/v1/116/house/bills/introduced.json', {
        headers: {
          'X-API-Key': 'WpG44Gi75vW020bamwbmW27o0d6OyAdrWcHq65uE'
        }
      });
      //oh  ok got it
      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        global.bills = json.results[0].bills
    for(var i =0; i<bills.length;i++){
      global.data[i] = [bills[i].short_title]
    }
    console.log(global.data[10])
console.log(global.bills)
 //fire that was not hard at all wow.
      //how u get api key
      } else {
        alert("HTTP-Error: " + response.status);
      }
      }
    url()
    return (
      <View style={styles.container}>
      <FlatList
style={{marginTop:200}}
data={this.state.data}
renderItem={({item})=>(
<View style={{justifyContent:'center',marginBottom:10}}>
<Text style={{backgroundColor:'blue',color:'white',padding:10,width:Dimensions.get('window').width}}>
{global.bills.short_title}
</Text>
</View>
)}
/>
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
});
