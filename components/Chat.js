import React, { Component } from 'react';
import {Text,Bubble } from 'react-native';

import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';


class Chat extends Component {
  static navigationOptions = {
    
    title: 'Ask a Question!',
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
    avatar:'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
    name:global.uname, 

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
    const { key: _id } = snapshot;  
    const message = {
      _id,
      text,
      user,
      createdAt: new Date()
    };
   return message;
  };
  // 1.

// 2.


contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}
// 3.
send = messages => {
  for (let i = 0; i < messages.length; i++) {
    const { text, user, createdAt } = messages[i];
    var str = global.uname

    if (this.contains(text.toLowerCase(), ['fuck','shit', 'cunt','bitch']))
    {
      text = "Message Has Been Censored"
    }
   // text = ((str).slice(0,(str).indexOf('@')) + ": " + "\n\n"  + text)

    // 4.
    const message = {
      text,
      user,
      createdAt,
    };
    this.append(message);
  }
};// 5.
append = message => this.ref.push(message);
render() {
  return (
    <GiftedChat
      renderUsernameOnMessage={true}
      messages={this.state.messages}
      onSend={this.send}

      user={this.user}
    />
  );
}
}const styles = StyleSheet.create({});export default Chat;