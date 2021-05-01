import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import Account from './components/account';
import Edit_water from './components/add_water';


import Delivery from './components/delivery';
import Edit from './components/editproduct';
import Edit_detail from './components/edit_productdetail';
import Address from './components/goinuoc'

import Info from './components/information_person';
import List_booking from './components/Listbooking';
import Product from './components/product';



const stack =createStackNavigator()

export default function Router_account() {

  return (
  <NavigationContainer independent="true" >
    <stack.Navigator initialRouteName="Account"  >
        
       
        <stack.Screen options={{headerShown:false}}  name="Account" component={Account}></stack.Screen>
        <stack.Screen  name="Chỉnh sửa sản phẩm" component={Edit}>
       
        </stack.Screen>
        <stack.Screen name="Chỉnh sửa" component={Edit_detail}/>
        <stack.Screen name="Thêm sản phẩm" component={Edit_water}/>
        <stack.Screen name="Thông tin người dùng" component={Info}/>
        <stack.Screen name="Danh sách đặt hàng" component={List_booking}/>
     
        <stack.Screen name="Danh sách giao hàng" component={Delivery}/>
    
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
