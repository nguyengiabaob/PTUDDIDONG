import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dangky from './components/dangky';
import Dangnhap from './components/dangnhap';

import Mainscreen from './components/mainscrren';


const stack =createStackNavigator()

export default function Router_() {

  return (
    <NavigationContainer  >
    <stack.Navigator initialRouteName="dangnhap" >
      
        <stack.Screen options={{headerShown:false}} name='mainscreen' component={Mainscreen}>
        </stack.Screen>
        <stack.Screen options={{headerShown:false}} name="dangnhap" component={Dangnhap}/>
        <stack.Screen options={{headerShown:false}} name="dangky" component={Dangky}/>
      
    </stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
