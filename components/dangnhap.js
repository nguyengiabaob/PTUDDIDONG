import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { Alert, Dimensions, Image, ImageBackground, Linking, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity,TextInput} from 'react-native-gesture-handler'

import { Dialog, Portal, Title,Paragraph, Provider } from 'react-native-paper';
import {Foundation} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Button} from 'react-native-paper';
import {useState} from 'react'


const db= firestore().collection('users');

const windows=Dimensions.get('window')
const  screen= Dimensions.get('screen')

export default function Dangnhap({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const [mk, setmk] = React.useState("");


  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [visible1, setVisible1] = React.useState(false);

  const showDialog1 = () => setVisible1(true);

  const hideDialog1 = () => setVisible1(false);
  const [click_, setclick_]= useState(false)
  const [tendangnhap, settendangnhap]= useState("")
  const [username, setusername]= useState("")
  const [password1, setpassword]= useState("")
  const [listdb, setlistsdb]=useState("")
  const [havemk_, sethavemk_]= useState(false)
  React.useEffect(()=>{
    return db.onSnapshot(querySnapshot=>{
      const list=[]
      querySnapshot.forEach( doc=>{
        const { users,password} = doc.data()   
        console.log(users);
        list.push(
          {
            id:doc.id,
            users,
            password
          }
        )
      })
      setlistsdb(list)
    })
    
  },[]) 
  const LineDiviver =()=>
{
    return(
        <View style={{width:1}}>
            <View style={{flex : 1 ,borderColor:"#FFF", borderLeftWidth:1}}>
                
            </View>

        </View>
    )
}
  function dangnhap()
  {
    console.log(username)
    let user= listdb.find(user=>(user.users===username&& user.password===password1))
    console.log(user)
    if(user!= null)
      {
        navigation.navigate("mainscreen",{name:user.users,id:user.id})
      }
    else
    {
      alert("Sai tài khoản hoặc mật khẩu")
    }
  }
  const laymatkhau=()=>{
    if(tendangnhap!=null)
    {
      let user= listdb.find(user=>(user.users===tendangnhap))
      if(user!=null)
      {
        setmk(user.password)
        sethavemk_(true)
      }
    }
  }
  

  return (
  
    <View style={styles.container}>
      <ImageBackground style={styles.style_Background} source={require('../images/wood.png')}>
        < View style={{alignSelf:'center',marginVertical:50}}>
        <View  style={styles.view_image}>
            <Image style={styles.imagebackground} source={require('../images/maulogotrasua.jpg')}>
                
            </Image>
          
          
        </View>
        <View style={styles.sectionStyle}> 
        <Image style={styles.imageStyle}
         source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png'}}>

        </Image>
         <TextInput placeholder="Tài khoản" style={{flex:1, width:500}} underlineColorAndroid="transparent" onChangeText={(text)=>{setusername(text)}} ></TextInput>
          </View> 
          <View style={styles.sectionStyle}> 
          <Foundation name="key" size={25} style={{marginLeft:5}} ></Foundation> 
          <TextInput placeholder="Mật Khẩu" style={{flex:1,width:500,marginLeft:10}} underlineColorAndroid="transparent" onChangeText={(text)=>{setpassword(text)}} ></TextInput> 
        </View>
       
       
       
        </View>
     
          <View>
            <View style={styles.view_btndangnhap} >
               <TouchableOpacity onPress={()=>{dangnhap()}}><Text style={{fontSize:18,color:'#FFFFFFFF',backgroundColor:'#3c72c3'}}>Đăng nhập</Text></TouchableOpacity>
            </View>
            <View style={styles.view_btndangky} >
               <TouchableOpacity onPress={()=>{navigation.navigate('dangky')}}><Text  style={{fontSize:18,color:'#FFFFFFFF',backgroundColor:'#02BE15'}}>Đăng ký</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>{setclick_(true)
            showDialog()}}>
              <Text style={[styles.click_quenmkk,{color: click_ ?'#3c72c3' : '#fff'}]}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            </View>

            <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25,height:250,marginBottom:150}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center',color:"#ff1414e8", fontWeight:'bold'}} >Lấy lại mật khẩu</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center"}}>
                            
                              <TextInput onChangeText={(text)=>{settendangnhap(text)}} placeholder="Tên đăng nhập" style={{borderRadius:20, borderColor:"#D3D3D3", borderWidth:3}}></TextInput>
                              
                          </Dialog.Content>
                          <Dialog.Actions style={{justifyContent:"flex-start", backgroundColor:"#3399FF",borderRadius:10}}>
                             
                          <Button style={{width:165, borderColor:"#FFF"}} onPress={()=>{
                           laymatkhau()
                            
                            hideDialog()
                           showDialog1()
                          }  
                        }><Text style={{color:"#FFF"}}>OK</Text></Button>
                            <LineDiviver/>
                          <Button style={{width:165}} onPress={hideDialog}><Text style={{color:"#FFF"}}>Thoát</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
                          <Provider>
                          <Portal>
                           <Dialog visible={visible1} onDismiss={hideDialog1} style={{borderRadius:25,marginBottom:100}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center',color:"#3399FF"}} >THÔNG BÁO</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>{havemk_? `Mật khẩu của bạn là : ${mk} `:"Tài khoản này không tồn tại"}</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={hideDialog1}><Text style={{color:"#3399FF"}}>ok</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
        </ImageBackground>
        {/* <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25,height:250,marginBottom:150}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center',color:"#ff1414e8", fontWeight:'bold'}} >Lấy lại mật khẩu</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center"}}>
                            
                              <TextInput onChangeText={(text)=>{settendangnhap(text)}} placeholder="Tên đăng nhập" style={{borderRadius:20, borderColor:"#D3D3D3", borderWidth:3}}></TextInput>
                              
                          </Dialog.Content>
                          <Dialog.Actions style={{justifyContent:"flex-start", backgroundColor:"#3399FF",borderRadius:10}}>
                             
                          <Button style={{width:165, borderColor:"#FFF"}} onPress={()=>{
                           laymatkhau()
                            
                            hideDialog()
                           showDialog1()
                          }  
                        }><Text style={{color:"#FFF"}}>OK</Text></Button>
                            <LineDiviver/>
                          <Button style={{width:165}} onPress={hideDialog}><Text style={{color:"#FFF"}}>Thoát</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
                          <Provider>
                          <Portal>
                           <Dialog visible={visible1} onDismiss={hideDialog1} style={{borderRadius:25,marginBottom:100}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center',color:"#3399FF"}} >THÔNG BÁO</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>{havemk_? `Mật khẩu của bạn là : ${mk} `:"Tài khoản này không tồn tại"}</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={hideDialog1}><Text style={{color:"#3399FF"}}>ok</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider> */}
                                
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
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  sectionStyle: {
    width:320,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 15,
    margin: 10,
  },
  imagebackground:
  {
    width:120,
    height:120,
    
  },
  view_image:
  {
   marginBottom:25,
    justifyContent:'center',
    alignItems:'center'
  },
  style_Background:
  {
   flex:1,
    width: windows.width,
    height:windows.height
  },
  view_btndangnhap:
  {
    alignSelf:'center',
    width:350,
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: '#03000000',
    height: 50,
    backgroundColor:'#3c72c3',
    borderRadius: 15,
    justifyContent:'center'
    
  },
  view_btndangky:
  {
    marginTop:25,
    alignSelf:'center',
    width:350,
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: '#03000000',
    height: 50,
    backgroundColor:'#02BE15',
    borderRadius: 15,
    justifyContent:'center'
  },
  click_quenmkk:
  {
   
    textDecorationLine:'underline',
    alignSelf:'center'
  }

});
