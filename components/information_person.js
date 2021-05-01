import React from 'react'
import {Text} from 'react-native'
import {Dimensions, ImageBackground, View} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {Feather,Entypo} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Dialog, Portal, Title,Paragraph, Provider } from 'react-native-paper';
import { Button} from 'react-native-paper';
export default function Info({route})
{
    
    const id= route.params.id
    const [listspp,setlistspp]= React.useState([])
    const db= firestore().collection('users')
    const [tennguoidung,settennguoidung]= React.useState("")
    const [diachi,setdiachi]= React.useState("")
    const [sdt,setsdt]= React.useState("")
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const window= Dimensions.get("window")
    React.useEffect(()=>{
        return db.onSnapshot(querySnapshot=>{
          const list=[]
          querySnapshot.forEach( doc=>{
            const { users,password,name_person,address,numberphone} = doc.data()   
            console.log(users);
            if(doc.id==id)
            list.push(
              {
                id:doc.id,
                users,
                password,
                name_person,
                address,
                numberphone
              }
            )
        
          })
          setlistspp(list)
        })
        
      },[]) 
   
    console.log(listspp)
async function caphat(id)
{
  if(tennguoidung!="")
  {
  await db.doc(id).update(
    {
      name_person:tennguoidung,
     
    })
  }
  if(diachi!="")
  {
  await db.doc(id).update(
    {
     
      address: diachi
      
    })
  }
  if(sdt!="")
  {
  await db.doc(id).update(
    {
      
     
      numberphone:sdt
    })
  }
  
 
}
    return(
        <View>
        <ImageBackground style={{width:window.width, height:window.height}} source={require("../images/maubackgrounddongian1024x768.jpg")}>
            {listspp.map(use=>(
            <View key={use.id}>
            <View  style={{marginTop:20,height:400}}>
                <View  style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput onChangeText={(text)=>{settennguoidung(text)}} placeholder="Tên người dùng" style={{ width: 320, height:40,borderRadius:7,borderColor:"#CCCCCC",borderWidth:1,backgroundColor:"#FFF"}}>{use.name_person}</TextInput>
                    <Entypo name="edit" size={25} color="#0e0e0e"></Entypo>
                </View>
                <View style={{marginTop:40,flexDirection:'row',alignItems:'center'}}>
                    <TextInput onChangeText={setdiachi} placeholder="Địa chỉ" style={{ width: 320, height:100,borderRadius:7,borderColor:"#CCCCCC",borderWidth:1,backgroundColor:"#FFF"}}>{use.address}</TextInput>
                    <Entypo name="edit" size={25} color="#0e0e0e"></Entypo>
                </View>
                <View  style={{marginTop:40,flexDirection:'row',alignItems:'center'}}>
                    <TextInput onChangeText={setsdt} keyboardType="numeric" maxLength={10} placeholder="Số điện thoại" style={{ width: 320, height:40,borderRadius:7,borderColor:"#CCCCCC",borderWidth:1,backgroundColor:"#FFF"}}>{use.numberphone}</TextInput>
                    <Entypo name="edit" size={25} color="#0e0e0e"></Entypo>
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent:"center" }}>
                <TouchableOpacity onPress={()=>{caphat(use.id)
                showDialog()
                }} style={{alignItems:'center',backgroundColor:"#3399FF",height:30,borderRadius:10, borderWidth:2,borderColor:"#FFF",width:100}}>
                    <Text style={{fontSize:15,color:"#FFF"}}>Lưu</Text>
                </TouchableOpacity>
            </View>
           
            </View>
            ))}
           
        </ImageBackground>
        <Provider >
                          <Portal >
                           <Dialog  visible={visible} onDismiss={hideDialog} style={{borderRadius:25, marginBottom:200}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Chúc mừng</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn thay đổi thông tin thành công</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={hideDialog}><Text style={{color:"#3399FF"}}>Thoát</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
        </View>
    )
}