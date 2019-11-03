import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles.js';
import config from '../../config';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    updateUsername = (text) => {
        this.setState({username: text});
    }

    updatePassword = (text) => {
        this.setState({ password: text })
    }

    signIn = async () => {
        let res = await this.login();

        if(!res.success){
            alert("Username or password is incorrect");
        } else {

        }
    }

    login = async () => {
        return new Promise((resolve, reject)=>{
            fetch(config.url + '/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(JSON.stringify(responseJson))
            })
            .catch((error) => {
                alert('Server is down.');
            });
        })
    }

    storeDataLocal = async (session_id) => {
        try {
          await AsyncStorage.setItem('@unique_id', session_id)
        } catch (e) {
          alert('Could not store the session_id')
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.general}>
              <View style={styles.userIconContainer}></View>
              <Text style={styles.title}>Login</Text>
              <View style={styles.textFields}>
                <Text style={styles.textFieldLabel}>Username</Text>
                <View style={styles.textField}>
                  <TextInput
                    autoCapitalize={'none'}
                    style={styles.textInput}
                    onChangeText={this.updateUsername}
                  />
                </View>
                <Text style={styles.textFieldLabel}>Password</Text>
                <View style={styles.textField}>
                  <TextInput
                    autoCapitalize={'none'}
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={this.updatePassword}
                  />
                </View>
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={this.signIn}
                underlayColor="transparent">
                <>
                  <Text style={styles.buttonText}> Sign In </Text>
                </>
              </TouchableHighlight>
            </View>
          </View>
        );
    }
};
export default Login;