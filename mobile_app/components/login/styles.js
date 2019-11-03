import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  general: {
    height: '80%',
    width: '95%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  userIconContainer: {
    height: '20%',
    width: '36%',
  },
  userIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  title: {
    fontSize: vw(6),
    color: 'rgb(170, 215, 238)',
  },
  textFields: {
    height: '50%',
    width: '80%',
    justifyContent: 'space-evenly',
  },
  textFieldLabel: {
    fontSize: vw(4),
    color: 'rgb(170, 215, 238)',
  },
  textField: {
    height: '12%',
    width: '100%',
    color: 'rgb(170, 215, 238)',
    borderColor: 'rgb(170, 215, 238)',
    borderWidth: 1,
    borderRadius: 5,
  },
  textBox: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
  },
  textInput: {
    height: '100%',
    width: '100%',
    fontSize: vw(4),
  },
  ageCheck: {
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: '4%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
  },
  buttonText: {
    fontSize: vw(4),
    color: 'rgb(170, 215, 238)',
  },
});
