import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {FontAwesome5} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { Dialog, Portal, Title,Paragraph, Provider, Button } from 'react-native-paper';
import { Image, StyleSheet, Text, View,Dimensions,ScrollView ,TouchableOpacity} from 'react-native';
const windows=Dimensions.get('window')

export default function List_booking({navigation,route}) {
  const [visible, setVisible] = React.useState(false);
  const [id_xoa, setid] = React.useState("");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const id = route.params.id
  const [listspp,setlistspp]= React.useState([])
  const [tongtien,setltongtien]= React.useState(0)
  const db1=firestore().collection('tbl_khachhang')
  React.useEffect(()=>{
    return db1.onSnapshot(querysnapshot=>{
      const list=[]
      querysnapshot.forEach(doc=>{
        const {STT,name_person,address,sdt,delivery}= doc.data()
        console.log(STT)
      
        list.push({
            id: doc.id,
            STT,
            name_person,
            address,
            sdt,
            delivery
           
        })
      
      })
      console.log(list)
      setlistspp(list)
    
    })
  },[])
//   async function cong(id,number)
//   {
//     if(number<=9)
//     {
//     await db1.doc(id).update(
//       {
//         number:number+1
//       }
//     )
//   }
// }

//   async function tru(id,number)
//   {
//     if(number>1)
//     {
//     await db1.doc(id).update(
//       {
//         number:number-1
//       }
//     )
//     }
//   }
//   async function xoa(id)
//   {
//     await db1.doc(id).delete().then(hideDialog())
//   }
function phanphat(stt,delivery)
{
    navigation.navigate("Danh sách giao hàng",{STT:stt,delivery:delivery})
}
  return (
    
    <View style={{backgroundColor:"#fff"}}>
        <View style={{alignItems:'center',backgroundColor:"#FFF"}}>
            <Image style={{height:86,width:200}}  source={require("../images/maulogotrasua.jpg")}>

            </Image>
        </View>
        <View >
        <ScrollView style={{height:510, marginTop:10}}>
              {listspp.map(item=>(
              <TouchableOpacity onPress={()=>phanphat(item.STT,item.delivery)} key={item.id} style={{height:80,borderRadius:7,borderColor:"#D3D3D3",borderWidth:3,justifyContent:'center'}}>
               
                <View
                style={{height:88, paddingLeft:10,paddingRight:35,flexDirection:'row',alignItems:'center',marginBottom:15}}>
                    <Text style={{width:30,height:30}}>{item.STT}</Text>
                     <Image style={{width:30,height:30}} source={require('../images/acount_1-playstore.png')}>

                    </Image>  
                    <View style={{marginLeft:5, width:157,flexDirection:'row'}}> 
                      <Text style={{marginBottom:10,marginLeft:20, fontSize:18,color:"#0c0c0ce8",fontWeight:'bold',width:120 }}>{item.name_person}</Text>
                      <Text style={{marginBottom:2,fontSize:18, marginLeft:40,color:"#0c0c0ce8" ,fontWeight:'bold',width:150}}> SDT :{item.sdt }</Text>
                      
                     
                    </View>
                    {/* <View style={{flexDirection:'row', marginLeft:1}}>
                      <TouchableOpacity onPress={()=>{cong(item.id,item.number)}} style={{ backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          
                          <Ionicons name ="md-add-outline" size={25} color="#FFF"></Ionicons>


                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{tru(item.id,item.number)}} style={{marginLeft:15, backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          
                          <Ionicons name ="remove" size={25} color="#FFF"></Ionicons>

                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{ setid(item.id) 
                        showDialog()}} style={{marginLeft:15, backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          <MaterialCommunityIcons name="delete" color="#fff" size={25}></MaterialCommunityIcons>
                          
                      </TouchableOpacity>
                      
                    </View> */}
                </View>
              </TouchableOpacity>
              ))}
             
          </ScrollView>
        </View>
        {/* <View style={{alignItems:'center',marginTop:15,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity style={{alignItems:'center',backgroundColor:"#ff1414e8",width:150,borderRadius:80,flexDirection:"row"}}onPress={()=>{navigation.navigate('address',{id:id})}}>
              <FontAwesome5  name="money-check" size={35} color="#dad7d7e8"></FontAwesome5>
              <Text style={{color:'#FFF',alignSelf:'center', fontSize:15,fontWeight:'bold',padding:5}}>Thanh Toán</Text>
            </TouchableOpacity>
            </View>
        
            <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Thông báo</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn có muốn xóa sản phẩm này không ?</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={()=>{xoa(id_xoa)}}><Text style={{color:"#3399FF"}}>Yes</Text></Button>
                          <Button onPress={hideDialog}><Text style={{color:"#3399FF"}}>No</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>     */}
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
});
    