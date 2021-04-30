import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Home from './screens/Home';
import Details from './screens/Details';
import UserProfile from './screens/UserProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props: {}){
    super(props);
    this.state = {}
    
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Home}>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
          <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer >
    );
  }
  
}
