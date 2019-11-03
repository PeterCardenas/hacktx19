import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  PermissionsAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles.js';
import config from '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import Drawer from 'react-native-drawer';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
            chatboxes: [],
            chatName: "",
            dateLastCalled: 0,
            lat: 0,
            long: 0,
            userId: this.props.navigation.getParam('userId', null)
        }
    }

    componentDidMount = async () => {
        if (Platform.OS == "ios") {
            Geolocation.requestAuthorization();
        } else {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              {
                title: 'App Location Permission',
                message: 'We need your location to give you the right chat room.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
        }

        await Geolocation.getCurrentPosition(this.geoSuccess, (pos) => false, { enableHighAccuracy: true });
    }

    geoSuccess = async (pos) => {
        this.setState({
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        });
       let chatboxes = await this.getChatboxes();
       console.log(chatboxes);
       if (chatboxes.length == 0) {
           this.setState({
               chatName: "general",
               chatboxes: ["general"]
           });
           this.createChatbox();
       }
       else {
           this.setState({
             chatboxes: chatboxes,
             chatName: chatboxes[0],
           });
       }
       await this.updateChatbox();
       let messages = await this.getMessages();
       this.setState({
           messages: messages
       });
        setInterval(this.getMessages, 1000);
    }

    messageChanged = (text) => {
        this.setState({
            message: text
        });
    }

    getChatboxes = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(`${config.url}/chatbox/get?lat=${this.state.lat}&long=${this.state.long}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let json = await res.json();
            resolve(json.rooms);
        });
    }

    updateChatbox = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(`${config.url}/user/update-chatbox`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: this.state.userId
                })
            });
            let json = await res.json();
            resolve(json);
        });
    }

    createChatbox = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(`${config.url}/chatbox/create`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lat: this.state.lat,
                    long: this.state.long,
                    chatName: this.state.chatName
                })
            });
            let json = await res.json();
            resolve(json);
        });
    }

    getMessages = async () => {
        return new Promise(async (resolve, reject) => {
            let date = Date.now();
            let res = await fetch(`${config.url}/message/get?lat=${this.state.lat}&long=${this.state.long}&date=${date}&dateLastCalled=${this.state.dateLastCalled}&chatName=${this.state.chatName}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                dateLastCalled: date
            });
            let messages = await res.json();
            resolve(messages.messages);
        });
    }

    postMessage = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch(config.url + '/message/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lat: this.state.lat,
                    long: this.state.long,
                    date: Date.now(),
                    userId: this.state.userId,
                    message: this.state.message,
                    chatName: this.state.chatName
                })
            });
            let json = res.json();
            resolve(json);
            this.setState({
                message: ''
            });
        });
    }

    renderMessage = (item) => {
        return (
            <Text>{item}</Text>
        );
    }

    renderDrawer = () => {
        return (
          <View
            style={{
              justifyContent: 'space-evenly',
              alignContent: 'center',
              marginTop: 50,
              marginLeft: 10
            }}>
            <FlatList
              data={this.state.chatboxes}
              extraData={this.state.chatboxes}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={async () => {
                    this.setState({
                      chatName: item,
                    });
                    await this.updateChatbox();
                    await this.getMessages();
                    this.drawer.close();
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );
    }

    openDrawer = () => {
        this.drawer.open();
    }

    render() {
        return (
          <Drawer
            ref={ref => (this.drawer = ref)}
            content={this.renderDrawer()}>
            <View
              style={{
                justifyContent: 'space-evenly',
                alignContent: 'center',
                marginTop: 50,
                marginLeft: 10,
              }}>
              <TouchableOpacity onPress={this.openDrawer}>
                <Text>Find Channels</Text>
              </TouchableOpacity>
              <SafeAreaView>
                <FlatList
                  data={this.state.messages}
                  extraData={this.state.messages}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => this.renderMessage(item)}
                />
              </SafeAreaView>
              <TextInput
                placeholder="Chat here..."
                onChangeText={this.messageChanged}
                onSubmitEditing={this.postMessage}
                value={this.state.message}
              />
            </View>
          </Drawer>
        );
    }
}

export default Chat;