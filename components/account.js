import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View,Image,Dimensions } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Value } from 'react-native-reanimated';
import {connect, useDispatch, useSelector,useStore} from 'react-redux'
import{MaterialIcons,Feather} from 'react-native-vector-icons'
import { CommonActions } from '@react-navigation/routers';

const windows=Dimensions.get('window')

 function Account({navigation}) {
  const dispatch= useDispatch()
  const id= useSelector(state=> state.id)
  const name= useSelector(state=> state.name)
  

  return (
   
    
    <View style={styles.container}>
       
        
       <View style={{flex: 0.5,backgroundColor:"#3399FF", width:windows.width ,justifyContent:'flex-end'}}>
            <Avatar.Image style={{alignSelf:'center'}} size={160} source={require('../images/acount_1-playstore.png')}></Avatar.Image>
       </View>
       <View style={{ flex: 0.15,backgroundColor:'#EEEEEE',width:windows.width,height:60, justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:28, fontStyle:'normal',}}>{name}</Text>
       </View>
       <View style={{justifyContent:'center'}}>
          <Button  icon="account"  mode='outlined'style={{width:windows.width}} color="#abaaaa" labelStyle={{marginRight:100, height:45,textAlignVertical:'center'}} onPress={() => navigation.navigate('Thông tin người dùng',{id: id, name :name})}>
                Thông tin người dùng 
          </Button>
       </View>
        <View style={{justifyContent:'center'}}>
          <Button  icon="square-edit-outline"  mode='outlined'style={{width:windows.width}} color="#abaaaa" labelStyle={{marginRight:120, height:45,textAlignVertical:'center'}} onPress={() =>navigation.navigate("Chỉnh sửa sản phẩm")}>
                Chỉnh sửa sản phẩm
          </Button>
       </View>
       <View style={{justifyContent:'center'}}>
          <Button  icon="expand-all-outline"  mode='outlined'style={{width:windows.width}} color="#abaaaa" labelStyle={{marginRight:163, height:45,textAlignVertical:'center'}} onPress={() => navigation.navigate("Thêm sản phẩm")}>
                Thêm sản phẩm
          </Button>
       </View>
      
       <View style={{justifyContent:'flex-start'}}>
          <Button  icon="format-list-checks"  mode='outlined'style={{width:windows.width}} color="#abaaaa" labelStyle={{marginRight:127, height:45,textAlignVertical:'center',marginLeft:10}} onPress={() => navigation.navigate("Danh sách đặt hàng",{id:id})}>
                Danh sách đặt hàng
          </Button>
       </View>
      
      
    </View>
  );
}
function mapStateToProps(state)
{
  return{
  Value : state.value
  }
}
function mapDispatchToProps(dispatch)
{
  return{
    id : ()=>dispatch({type: 'id'}),
    name : ()=>dispatch({type : 'name'})
  }
}
export default connect(mapStateToProps) (Account)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  style_avatar:
  {
    borderRadius:40,
    width:154,
    height:156,
    alignSelf:'center'
  }
});
