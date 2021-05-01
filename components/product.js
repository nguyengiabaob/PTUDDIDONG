import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {EvilIcons} from 'react-native-vector-icons'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function Product() {
  return (
    
   <View style={styles.container}>
       <View style={{borderColor:"#D3D3D3",borderWidth:3}}>
       <View style={{ alignSelf:"flex-start",flexDirection:'row', }}>
           <TextInput style={{borderRadius:80, width:320,borderColor:"#b9b9b9",borderWidth:1,height:45, marginTop:5}}>
                
           </TextInput>
           <TouchableOpacity style={{justifyContent:'center',backgroundColor:"#3399FF",marginTop:5, width:45,height:45, borderRadius:80, marginLeft:10}}>
             
               <EvilIcons name="search" size={45} color="#FFF"></EvilIcons>
           </TouchableOpacity>
       </View>
       <View>
            
       </View>
       </View>

   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
    