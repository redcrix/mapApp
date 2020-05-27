import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
