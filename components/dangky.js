import React from 'react'
import { View,StyleSheet,Image,Dimensions,Text} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { Dialog, Portal, Title,Paragraph, Provider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
export default function Dangky({navigation})
{
    const db= firestore().collection('users');
    const [tennguoidung,settennguoidung]= React.useState("")
    const [tentaikhoan,settentaikhoan]= React.useState("")
    const [matkhau,setmatkhau]= React.useState("")
    const [nhaplaimatkhau,setnhaplaimatkhau]= React.useState("")
    const [visible, setVisible] = React.useState(false);
    const [listdb, setlistsdb]=React.useState("")
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
   

    const windows= Dimensions.get('window')
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

      function kiemtra()
      {
        let user= listdb.find(user=>(user.users===tentaikhoan))
        console.log(listdb)
        if(user!=null)
        {
            alert("Tên tài khoản đã tồn tại")
            return false
        }
        else if(matkhau.length<8)
        {   
            alert("Mật khẩu phải có ít nhất 8 kí tự")
            return false
        }
        else if(nhaplaimatkhau!=matkhau)
        {
            alert("Mật khẩu và nhập lại mật khẩu không trùng nhau")
            return false
        }
        return true
         
      }
 async function dangky()
      {
        
        if(kiemtra()===true)
         {
            await db.add(
                {
                    users:tentaikhoan,
                    address:null,
                    numberphone:null,
                    name_person:tennguoidung,
                    password:matkhau
                }
            ).then(
                showDialog()
            )
         }

      }
    return(
        <View style={styles.container}>
            <View style={{alignItems:'center',backgroundColor:'#FFF'}}>
                <Image style={{width:200,height:100}} source={require("../images/maulogotrasua.jpg")}>

                </Image>
            </View>
            <View style={{backgroundColor:'#FFF',borderWidth:3, borderColor:"#efefef",width:windows.width,height:windows.height}}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#efefef',borderRadius:7, borderWidth:3,borderColor:"#D3D3D3",height:50}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Sign in</Text>
            </View>
            <View style={{alignItems:'center',marginTop:10}}>
                <TextInput onChangeText={(text)=>{settennguoidung(text)}} placeholder="Tên người dùng" style={{backgroundColor:"#FFF",borderRadius:15,borderWidth:2,width:350,borderColor:"#a0a0a0"}}>

                </TextInput>
            </View>
            <View style={{alignItems:'center',marginTop:20}}>
                <TextInput onChangeText={(text)=>{settentaikhoan(text)}} placeholder="Tên tài khoản" style={{backgroundColor:"#FFF",borderRadius:15,borderWidth:2,width:350,borderColor:"#a0a0a0"}}>

                </TextInput>
            </View>
            
           
            <View style={{alignItems:'center',marginTop:20}}>
                <TextInput secureTextEntry={true} onChangeText={(text)=>{setmatkhau(text)}} placeholder="Mật khẩu" style={{backgroundColor:"#FFF",borderRadius:15,borderWidth:2,width:350,borderColor:"#a0a0a0"}}>

                </TextInput>
            </View>
            <View style={{alignItems:'center',marginTop:20}}>
                <TextInput secureTextEntry={true} onChangeText={(text)=>{setnhaplaimatkhau(text)}} placeholder="nhập lại mật khẩu" style={{backgroundColor:"#FFF",borderRadius:15,borderWidth:2,width:350,borderColor:"#a0a0a0"}}>

                </TextInput>
            </View>
            <View style={{marginTop: 25}}>
                <TouchableOpacity style={{backgroundColor:"#3399FF",borderRadius:8,alignItems:'center', height:40,justifyContent:'center'}}><Text style={{color:'#FFF',fontSize:18}} onPress={()=>{dangky()}}>Đăng ký</Text></TouchableOpacity>
            </View>
            <View style={{marginTop: 25}}>
                <TouchableOpacity style={{backgroundColor:"#02BE15",borderRadius:8,alignItems:'center', height:40,justifyContent:'center'}}><Text style={{color:'#FFF',fontSize:18}} onPress={()=>{navigation.navigate("dangnhap")}}>Thoát</Text></TouchableOpacity>
            </View>
            </View>
            <Provider >
                          <Portal >
                           <Dialog  visible={visible} onDismiss={hideDialog} style={{borderRadius:25, marginBottom:30}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Chúc mừng</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn đã đăng ký thành công</Paragraph>
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
const styles= StyleSheet.create({
    container:
    {
        flex:1,
        justifyContent:'flex-start'
    
    
    }
}
)