
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './screens/chat';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import splash from './screens/splash';
import ContactList from './screens/main';
import { UserProvider } from './config/usercontext';


const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'splash' component={splash} options= {{headerShown: false}} />
        <Stack.Screen name = 'SignUp' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name = 'Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name = 'Home' component={ContactList} options={{headerShown: false}}/>
        <Stack.Screen name = 'chat' component={Chat} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}