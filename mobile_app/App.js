import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import Start from './components/start/start';

class App extends Component  {
    render() {
        return (
            <Start/>
        );
    }
};
console.disableYellowBox = true;
export default App;
