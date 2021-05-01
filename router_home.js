import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cart from './components/cart';
import Address from './components/goinuoc'
import Home from './components/Home';
import Product from './components/product';
import Account from './components/account';
import Table_ from './components/table'

const stack =createStackNavigator()

export default function Router_home() {

  return (
   
    <stack.Navigator initialRouteName="Home" >
        
       
        <stack.Screen options={{headerShown:false}}  name="Home" component={Home}></stack.Screen>
        <stack.Screen  name='Danh sách sản phẩm' component={Table_}>
       
        </stack.Screen>
        <stack.Screen  options={{headerShown:false}} name="cart_" component={Cart}/>
        <stack.Screen name="Thông tin người đặt" component={Address}/>
        <stack.Screen name="product" component={Product}/>
     
       
    
    </stack.Navigator>

  
   

    
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
