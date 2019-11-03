import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Geolocation from 'react-native-geolocation-service';
import Login from '../login';
import Registration from '../registration';
import Chat from '../chat';

// Switch to stack navigator here for better transitioning throughout app
const AppNavigator = createSwitchNavigator({
    Home: Registration,
    Chat: Chat
}, {
    headerMode: 'none',
    mode: 'card',
    cardStyle: { backgroundColor: '#0084C8' },
    defaultNavigationOptions: { gesturesEnabled: false }
});

export default createAppContainer(AppNavigator);