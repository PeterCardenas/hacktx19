import React, { Component } from 'react';
import {View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Login from '../login';
import Registration from '../registration';
import Chat from '../chat';

class Start extends Component {
  async componentDidMount() {
      let id = await this.getData();
      if (id) {
          this.props.navigation.navigate('Chat', {userId: id});
      } else {
          this.props.navigation.navigate('Registration');
      }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@unique_id');
      return value;
    } catch (e) {
      return null;
    }
  };

  render() {
    return <View></View>;
  }
}

// Switch to stack navigator here for better transitioning throughout app
const AppNavigator = createSwitchNavigator({
    Home: Start,
    Registration: Registration,
    Chat: Chat
}, {
    headerMode: 'none',
    mode: 'card',
    cardStyle: { backgroundColor: '#0084C8' },
    defaultNavigationOptions: { gesturesEnabled: false }
});

export default createAppContainer(AppNavigator);