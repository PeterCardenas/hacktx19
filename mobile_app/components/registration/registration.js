import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, TextInput, Platform } from 'react-native';
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles.js';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      age: 0,
      sex: '',
      platform: Platform.OS === 'ios',
    };
    this.textStyleEmail = styles.textInput;
    this.textStylePass = styles.textInput;
  }

  updateName = text => {
    this.setState({name: text});
  };

  updateUsername = text => {
    this.setState({username: text});
  };

  updateAge = text => {
    this.setState({age: text});
  };

  updatePassword = text => {
    this.setState({password: text});
  };

  updateSex = text => {
    this.setState({sex: text});
  };

  signUp = async () => {
    let res = await this.register();

    if (!res.success) {
      alert('Fix your sign in bro');
    } else {
        await this.storeDataLocal(res.userId);
        this.props.navigation.navigate('Chat', {userId: res.userId});
    }
  };

  storeDataLocal = async session_id => {
    try {
      await AsyncStorage.setItem('@unique_id', session_id);
    } catch (e) {
      alert('Could not store the session_id');
    }
  };

  register = async () => {
    return new Promise((resolve, reject) => {
      fetch(config.url + '/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          sex: this.state.sex,
          age: this.state.age,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          alert(
            'Server is down. Account could not be registered. Try again later.',
          );
        });
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        enableAutomaticScroll={this.state.platform}>
        <View style={styles.container}>
          <Text style={styles.title}> New User Registration</Text>
          <View style={styles.textFields}>
            <Text style={styles.textFieldLabel}>Name</Text>
            <View style={styles.textField}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                returnKeyType={'next'}
                onChangeText={this.updateName}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Text style={styles.textFieldLabel}>Age</Text>
            <View style={styles.textField}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                ref={input => {
                  this.secondTextInput = input;
                }}
                returnKeyType={'next'}
                onChangeText={this.updateAge}
                keyboardType={'number-pad'}
                onSubmitEditing={() => {
                  this.thirdTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Text style={styles.textFieldLabel}>Sex</Text>
            <View style={styles.textField}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                ref={input => {
                  this.thirdTextInput = input;
                }}
                returnKeyType={'next'}
                onChangeText={this.updateSex}
                onSubmitEditing={() => {
                  this.fourthTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Text style={styles.textFieldLabel}>Username</Text>
            <View style={styles.textField}>
              <TextInput
                style={this.textStyleEmail}
                autoCorrect={false}
                autoCapitalize={'none'}
                ref={input => {
                  this.fourthTextInput = input;
                }}
                returnKeyType={'next'}
                onChangeText={this.updateUsername}
                onSubmitEditing={({nativeEvent}) => {
                  this.validEmail(nativeEvent.text);
                  this.fifthTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Text style={styles.textFieldLabel}>Password</Text>
            <View style={styles.textField}>
              <TextInput
                style={this.textStylePass}
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize={'none'}
                ref={input => {
                  this.fifthTextInput = input;
                }}
                onChangeText={this.updatePassword}
              />
            </View>
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.signUp}
            underlayColor="transparent">
            <>
              <Text style={styles.buttonText}> Sign Up </Text>
            </>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    );
  }
};
export default Registration;