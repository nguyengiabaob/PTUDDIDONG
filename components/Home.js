import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import {connect, useDispatch, useSelector,useStore} from 'react-redux'

import {createStore} from 'redux'
const windows=Dimensions.get('window')
export default function Home({navigation}) {
  const dispatch= useDispatch()
  const id= useSelector(state=> state.id)
  const name= useSelector(state=> state.name)
 
  return (
    
    <View style={styles.container}>
      <ImageBackground style={styles.style_Background} source={require('../images/backgroundhome.jpg')}>
         <View>
           <Text style={{fontSize:20,color:"#FFFFFF",}}>Xin Chào,</Text>
           <Text style={{fontSize:20,color:"#FFFFFF",}}>{name}</Text>
         </View>
         <View style={{marginTop:20}}>
           <Image style={styles.style_hinhmau} source={require('../images/hinihmau.jpg')}>

           </Image>
         </View>
         <View style={styles.style_chucnang}>
            <View style={{marginLeft:8, alignItems:'center'}}>
              <IconButton style={{borderRadius:50, backgroundColor:'#efefef'}} color="#63aaf3" icon='food-fork-drink' onPress={()=>{navigation.navigate("Danh sách sản phẩm",{id:id})}} >
              </IconButton>
             
              <Text>Gọi nước</Text>

            </View>
            {/* <View style={{marginLeft:16,alignItems:'center'}}>
              <IconButton style={{borderRadius:50, backgroundColor:'#efefef',}} color="#63aaf3" icon='table' >
                  

              </IconButton>
             
              <Text>Quản lý bàn</Text>

            </View> */}
            
            
         </View>


      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style_Background:
  {
   flex:1,
    width: windows.width,
    height:windows.height
  },
  
  style_hinhmau:
  {
    borderRadius:15,
    width:371,
    height:306,
    alignSelf:'center'
  },
  style_chucnang:
  {
    width:328,
    height:214,
    backgroundColor:"#fff",
    alignSelf:'center',
    flexDirection:'row',
    
    borderRadius:15
  
  }

});
