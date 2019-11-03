import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles.js';
import config from '../../config';
import { ScrollView } from 'react-native-gesture-handler';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            chatName: "",
            dateLastCalled: null
        }
    }

    messageChanged = (text) => {
        this.setState({
            message: text
        })
    }

    getChatboxes = async () => {
        // lat, long
        return new Promise((resolve, reject) => {
            
        });
    }

    getMessages = async () => {
        return new Promise((resolve, reject) => {
            let date = Date.now();
            let res = await fetch(config.url + '/message/get', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lat: this.state.email,
                long: this.state.password,
                date: date,
                dateLastCalled: this.state.dateLastCalled,
                chatName: this.state.chatName
              }),
            });
            this.setState({
                dateLastCalled: date
            });
            let messages = await res.json();
            resolve(messages);
        });
    }

    postMessage = async () => {
        return new Promise((resolve, reject) => {
            let res = await fetch(config.url + '/message/create', {
                method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lat: this.state.email,
                long: this.state.password,
                date: date,
                dateLastCalled: this.state.dateLastCalled,
                chatName: this.state.chatName
              })
            });
            let json = res.json();
            resolve(json);
        });
    }

    renderMessage = (item) => {
        return (
            <Text></Text>
        );
    }

    render() {
        return (
        <View>
          <ScrollView>
            <FlatList
              data={this.state.messages}
              extraData={this.state.messages}
              renderItem={({item}) => this.renderMessage(item)}
            />
          </ScrollView>
          <TextInput
            placeholder="Chat here..."
            onChangeText={this.messageChanged}
            onSubmitEditing={this.postMessage}
            value={this.state.message}
          />
          <TouchableOpacity></TouchableOpacity>
        </View>
        );
    }
}

export default Chat;