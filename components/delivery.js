import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {FontAwesome5} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { Dialog, Portal, Title,Paragraph, Provider, Button } from 'react-native-paper';
import { Image, StyleSheet, Text, View,Dimensions,ScrollView ,TouchableOpacity} from 'react-native';
import { set } from 'react-native-reanimated';
const windows=Dimensions.get('window')
const water=[
    { ID:1,
      name: 'trà sữa',
      gia: 75000,
  
  
    },
    { ID:2,
      name: 'trà sữa',
      gia: 75000,
  
  
    },
    {ID:3,
       name: 'trà sữa',
      gia: 75000,
  
  
    },
    { 
      ID:4,
      name: 'trà sữa',
      gia: 75000,
  
  
    }
  ]
export default function Delivery({navigation,route}) {
  const [visible, setVisible] = React.useState(false);
  
  const showDialog = () => setVisible(true);
  const [idkh, setidkh] = React.useState("");
  const hideDialog = () => setVisible(false);
  const delivery_1 = route.params.delivery
  const [check, setcheck] = React.useState(delivery_1);
  console.log(check)
  const id = route.params.id
  const stt = route.params.STT
  const s = route.params.STT
  const [listspp,setlistspp]= React.useState([])
  const [list,setlist]= React.useState([])
  const [tongtien,setltongtien]= React.useState(0)
  const db1=firestore().collection('tbl_pay')
  const db2=firestore().collection('tbl_khachhang')
  const db3=firestore().collection('tbl_water')
  React.useEffect(()=>{
      db1.onSnapshot(querysnapshot=>{
      const list=[]
      let tong=0
      querysnapshot.forEach(doc=>{
        const {STT,name_water,price_water,number,image,delivery}= doc.data()
        console.log(name_water)
        if(STT===stt&& delivery===false)
        {
        list.push({
            id: doc.id,
            STT,
            name_water,
            price_water,
            number,
            image,
            delivery
            
        })
        tong+=price_water*number
      }
      })
      console.log(list)
      setlistspp(list)
      setltongtien(tong)
    })
    let idkh=''
        db2.onSnapshot(querysnapshot=>{
            querysnapshot.forEach(doc=>{
                const{STT} =doc.data()
                if(STT===stt)
                {
                    idkh=doc.id
                }
            })
            setidkh(idkh)
        })
    db3.onSnapshot(querysnapshot=>{
      const list =[]
      querysnapshot.forEach(doc=>{
        const {name_water,number,price_water}=doc.data()
        list.push(
          {
            id:doc.id,
            name_water,
            price_water,
            number
          }
        )
      })
      setlist(list)
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
async function giaohang()
{
    await listspp.forEach(item=>{
      db1.doc(item.id).update({delivery: true})
    })
    
    capnhatgiaohang()
    
    db2.doc(idkh).update(
        {
            delivery:true
        }
    ).then(
       
        showDialog(),
        setcheck(true)
    )
}
async function capnhatgiaohang()
{
 await listspp.forEach(item=>{
      list.forEach(itemm=>{
        if(itemm.name_water===item.name_water)
        {
            db3.doc(itemm.id).update({
              number:itemm.number-item.number
            })
        }
      })
  })
}
  return (
    
    <View>
        <View style={{alignItems:'center',backgroundColor:"#FFF"}}>
            <Image style={{height:86,width:200}}  source={require("../images/maulogotrasua.jpg")}>

            </Image>
        </View>
        <View>
        <ScrollView style={{height:410}}>
              {listspp.map(item=>(
              <View key={item.id} style={{borderColor:"#D3D3D3",borderWidth:3,justifyContent:'center'}}>
               
                <View  key={item.id}
                style={{height:88, paddingLeft:10,paddingRight:35,flexDirection:'row',alignItems:'center',marginBottom:15}}>
                     <Image style={{width:75,height:75}} source={item.image}>

                    </Image>  
                    <View style={{marginLeft:5, width:157}}> 
                      <Text style={{marginBottom:12, fontSize:18,color:"#0c0c0ce8",fontWeight:'bold'}}>{item.name_water}</Text>
                      <Text style={{marginBottom:10,fontSize:13 ,color:"#00AA00",fontStyle:'italic',fontWeight:'bold'}}> Số lượng :{item.number }</Text>
                      <Text style={{fontSize:18,color:"#00AA00",fontStyle:'italic',fontWeight:'bold'}}> Giá :{item.price_water}</Text>
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
              </View>
              ))}
             
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight:'bold', color:"#080808"}}>Tổng tiền</Text>
            <Text style={{marginLeft:80,fontWeight:'bold',color:"#080808"}}>{tongtien} Đ</Text>

        </View>
        <View style={{alignItems:'center',marginTop:15,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity activeOpacity={check?100:50} style={{alignItems:'center',backgroundColor:check?"#9e9d9d":"#3399FF",width:150,borderRadius:80,flexDirection:"row"}}onPress={()=>{if( check===false)
        {
            giaohang()
        }}}>
              <FontAwesome5  name="money-check" size={35} color="#dad7d7e8"></FontAwesome5>
              <Text style={{color:'#FFF',alignSelf:'center', fontSize:15,fontWeight:'bold',padding:5}}>Giao Hàng</Text>
            </TouchableOpacity>
            </View>
        
            <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Thông báo</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn đã giao hàng thành công </Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          {/* <Button onPress={()=>{xoa(id_xoa)}}><Text style={{color:"#3399FF"}}>Yes</Text></Button> */}
                          <Button onPress={hideDialog}><Text style={{color:"#3399FF"}}>Thoát</Text></Button>
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
    