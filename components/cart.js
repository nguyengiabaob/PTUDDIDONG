import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {FontAwesome5} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { Dialog, Portal, Title,Paragraph, Provider, Button } from 'react-native-paper';
import { Image, StyleSheet, Text, View,Dimensions,ScrollView ,TouchableOpacity} from 'react-native';
const windows=Dimensions.get('window')

export default function Cart({navigation,route}) {
  const [visible, setVisible] = React.useState(false);
  const [id_xoa, setid] = React.useState("");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const id = route.params.id
  const [listspp,setlistspp]= React.useState([])
  const [list,setlist]= React.useState([])
  const [tongtien,setltongtien]= React.useState(0)
  const db1=firestore().collection('tbl_booking')
  const db2=firestore().collection('tbl_water')
  React.useEffect(()=>{
    db1.onSnapshot(querysnapshot=>{
      const list=[]
      querysnapshot.forEach(doc=>{
        const {id_khachhang,name_water,price_water,number,check,image}= doc.data()
        console.log(name_water)
        if(id_khachhang===id&&check===false)
        {
        list.push({
            id: doc.id,
            id_khachhang,
            name_water,
            price_water,
            number,
            image
        })
      }
      })
      console.log(list)
      setlistspp(list)
    
    })
    db2.onSnapshot(querysnapshot=>{
      const list=[]
      querysnapshot.forEach(doc=>{
        const {id_water,name_water,price_water,number}=doc.data()
        list.push(
          {
            id:doc.id,
            id_water,
            name_water,
            price_water,
            number
          }
        )
      })
      setlist(list)
    })
    setVisible(false)
  },[])
 function cong(id,number,name)
  {
    let user = list.find(user=>user.name_water===name)
 
    if(number<user.number)
    {
    db1.doc(id).update(
      {
        number:number+1
      }
    )
  }
}

  async function tru(id,number)
  {
    if(number>1)
    {
    await db1.doc(id).update(
      {
        number:number-1
      }
    )
    }
  }
  async function xoa(id)
  {
    await db1.doc(id).delete().then(hideDialog())
  }
  return (
    
    <View>
        <View style={{alignItems:'center',backgroundColor:"#FFF"}}>
            <Image style={{height:86,width:200}}  source={require("../images/maulogotrasua.jpg")}>

            </Image>
        </View>
        <View>
        <ScrollView style={{height:480}}>
              {listspp.map(item=>(
              <View key={item.id} style={{borderColor:"#D3D3D3",borderWidth:3,justifyContent:'center'}}>
               
                <View  key={item.id}
                style={{height:88, paddingLeft:10,paddingRight:35,flexDirection:'row',alignItems:'center',marginBottom:15}}>
                     <Image style={{width:75,height:75}} source={item.image}>

                    </Image>  
                    <View style={{marginLeft:5, width:160}}> 
                      <Text style={{marginBottom:12, fontSize:18,color:"#0c0c0ce8",fontWeight:'bold'}}>{item.name_water}</Text>
                      <Text style={{marginBottom:10,fontSize:13 ,color:"#00AA00",fontStyle:'italic',fontWeight:'bold'}}> Số lượng :{item.number }</Text>
                      <Text style={{fontSize:18,color:"#00AA00",fontStyle:'italic',fontWeight:'bold'}}> Giá :{item.price_water} Đ</Text>
                    </View>
                    <View style={{flexDirection:'row', marginLeft:1}}>
                      <TouchableOpacity onPress={()=>{cong(item.id,item.number,item.name_water)}} style={{ backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          
                          <Ionicons name ="md-add-outline" size={25} color="#FFF"></Ionicons>


                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{tru(item.id,item.number)}} style={{marginLeft:15, backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          
                          <Ionicons name ="remove" size={25} color="#FFF"></Ionicons>

                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{ setid(item.id) 
                        showDialog()}} style={{marginLeft:15, backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          <MaterialCommunityIcons name="delete" color="#fff" size={25}></MaterialCommunityIcons>
                          
                      </TouchableOpacity>
                      
                    </View>
                </View>
              </View>
              ))}
             
          </ScrollView>
        </View>
        <View style={{alignItems:'center',marginTop:15,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity style={{alignItems:'center',backgroundColor:"#ff1414e8",width:150,borderRadius:80,flexDirection:"row"}}onPress={()=>{navigation.navigate('Thông tin người đặt',{id:id})}}>
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
                          </Provider>    
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
    