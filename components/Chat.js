import React, { Component } from 'react';
import AsyncStorage from 'react-native';

import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';


class Chat extends Component {
  static navigationOptions = {
    
    title: 'Hello There!',
  };  // 3.
  state = {
    messages: [],
  };
// 1.
componentDidMount() {
  this.on(message =>
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  );
}// 2.
componentWillUnmount() {
  this.off();
}

get user() {  // Return our name and our UID for GiftedChat to parse
  return {
    uname:global.uname
    , 
    _id: this.uid,

  };
}

  get ref() {

    return firebase.database().ref('messages');
  }// 2.
  on = callback =>
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));// 3.
  parse = snapshot => {
  }// 4.
  off() {
    this.ref.off();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  parse = snapshot => {  // 1.
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;  // 2.
    const timestamp = new Date(numberStamp);  // 3.
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
   return message;
  };
  // 1.

// 2.


get timestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
}

// 3.
send = messages => {
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];    // 4.
    const message = {
      text,
      user,
      timestamp: this.timestamp,
    };
    this.append(message);
  }
};// 5.
append = message => this.ref.push(message);
render() {
  return (
    <GiftedChat
      messages={this.state.messages}
      onSend={this.send}
      user={this.user}
    />
  );
}
}const styles = StyleSheet.create({});export default Chat;