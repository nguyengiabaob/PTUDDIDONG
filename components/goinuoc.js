import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  FlatList, Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Dialog, Portal, Title,Paragraph, Provider } from 'react-native-paper';
import {AntDesign} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Button} from 'react-native-paper';
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
export default function Address({navigation,route}) {
   const [tongtien,settongtien]= React.useState(0)
   const [listSTT,setlistSTT]= React.useState([])
   const [tientra,settientra]= React.useState(0)
   const [mataikhoan,setmataikhoan]= React.useState(0)
   const [stt,setstt]= React.useState(0)
  const id =route.params.id
  const [listspp,setlistspp]= React.useState([])
 
  const [diachi,setdiachi]=React.useState("")
  const [tennguoidathang,setdathang]=React.useState("")
  const [sodienthoai,setsodienthoai]=React.useState("")
  const [cmnd,setcmnd]=React.useState("")
  const db1=firestore().collection('tbl_booking')
  const db2=firestore().collection('tbl_pay')
  const db3=firestore().collection('tbl_khachhang')
  React.useEffect(()=>{
     db1.onSnapshot(querysnapshot=>{
      let tong=0
      const list=[]
      querysnapshot.forEach(doc=>{
        const {id_khachhang,name_water,price_water,number,image,check}= doc.data()
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
        
        tong+=price_water*number
      }
      })
    
      setlistspp(list)
      settongtien(tong)
    })
    let st=0
    db3.onSnapshot(querysnapshot=>{
      querysnapshot.forEach(doc=>{
        const {STT}= doc.data()
        const list=[]
        list.push(
         {
           STT:STT
         }
        )
       list.forEach(item=>{
         if(item.STT>st)
         {
            st=item.STT
         }
       })
        

      })
      setstt(st)
    })
  },[])
async function capnhat()
{ 
  await 
    
 
 db3.add(
        {
          STT:stt+1,
          name_person:tennguoidathang,
          address: diachi,
          sdt: sodienthoai,
          delivery:false
        }
      )
    }
  
  

// function update()
// {
//     listspp.map(item=>{
//       capnhat()
//     })
// }
async function capnhat1()
{ 
  await listspp.map(item=>{
    
 
 db2.add(
        {
          STT:stt+1,
          name_water:item.name_water,
          price_water: item.price_water,
          number: item.number,
          image: item.image,
          delivery:false
          
        }
      )
    })
  }
  async function   capnhat2()
  { 
    await listspp.map(item=>{
      
   
   db1.doc(item.id).update(
          {
            
            check: true
          }
        )
      })
    }

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
    const [visible1, setVisible1] = React.useState(false);

    const showDialog1 = () => setVisible1(true);
  
    const hideDialog1 = () => setVisible1(false);
    console.log(tongtien)
    const LineDiviver =()=>
{
    return(
        <View style={{width:1}}>
            <View style={{flex : 1 ,borderColor:"#FFF", borderLeftWidth:1}}>
                
            </View>

        </View>
    )
}

  return (
        <View style={styles.container}>
            <View style={{borderRadius:10, width:windows.width,backgroundColor:"#ff1414e8",alignItems:"center",height:35,justifyContent:"center", }}>
                <Text style={{fontSize:18,color:"#FFF"}}>Thông tin đặt hàng</Text>
          </View>
          <View style={{borderColor:"#D3D3D3", borderWidth:3,borderRadius:10, height:500}}>
          <View style={{marginTop:10}}  >
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Tên người đặt hàng </Text>
                
                <TextInput onChangeText={(text)=>{setdathang(text)}} style={{marginTop:5,width:380,borderRadius:20,height:50,borderColor:"#D3D3D3",borderWidth:3}} ></TextInput>
          </View>
          <View style={{marginTop:40}} >
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Địa chỉ </Text>
                
                <TextInput onChangeText={(text)=>{setdiachi(text)}} style={{marginTop:5,width:380,borderRadius:20,height:80,borderColor:"#D3D3D3",borderWidth:3}} ></TextInput>
          </View>
          <View  style={{marginTop:40}}>
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Số điện thoại </Text>
                
                <TextInput maxLength={10}  keyboardType="numeric" onChangeText={(text)=>{setsodienthoai(text)}} style={{marginTop:5,width:300,borderRadius:20,height:50,borderColor:"#D3D3D3",borderWidth:3}} ></TextInput>
          </View>
          {/* <View  style={{marginTop:40}}>
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>CMND </Text>
                
                <TextInput onChangeText={(text)=>{setcmnd(text)}} style={{marginTop:5,width:300,borderRadius:20,height:50,borderColor:"#D3D3D3",borderWidth:3}} >dsadadasd</TextInput>
          </View> */}
          </View>
          <View style={{alignItems:'center',marginTop:5,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity style={{alignItems:'center',backgroundColor:"#ff1414e8",width:150,borderRadius:80,flexDirection:"row", justifyContent:'center'}}onPress={()=>{showDialog()}}>
              
              <Text style={{color:'#FFF',alignSelf:'center', fontSize:15,fontWeight:'bold',padding:5}}>Xác nhận</Text>
            </TouchableOpacity>
        
            </View>
            <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25,height:450}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center',color:"#ff1414e8", fontWeight:'bold'}} >Thanh toán</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center"}}>
                              {/* <Paragraph style={{fontSize:15}}>Bạn đã thêm một sản phẩm vào giỏ hàng</Paragraph> */}
                              <TextInput onChangeText={(text)=>{setmataikhoan(text)}} placeholder="Mã tài khoản" style={{borderRadius:20, borderColor:"#D3D3D3", borderWidth:3}}></TextInput>
                              <TextInput onChangeText={(text)=>{settientra(Number.parseInt(text))}} placeholder="Số tiền trả" style={{marginTop:40,borderRadius:20, borderColor:"#D3D3D3", borderWidth:3}}></TextInput>
                              <View style={{flexDirection:'row',marginTop:50}}>
                              <Text style={{fontWeight:'bold',fontSize:15,}} >Tổng tiền</Text>
                              <Text style={{ width:100,marginLeft:150, fontWeight:"bold",fontSize:15}}>{tongtien} đ</Text>
                              </View>
                          </Dialog.Content>
                          <Dialog.Actions style={{justifyContent:"flex-start", backgroundColor:"#3399FF",borderRadius:10}}>
                             
                          <Button style={{width:165, borderColor:"#FFF"}} onPress={()=>{
                            if(tientra>=tongtien)
                            {
                              capnhat()
                              capnhat1()
                              capnhat2()
                              hideDialog()
                           showDialog1()
                          }}  
                        }><Text style={{color:"#FFF"}}>OK</Text></Button>
                            <LineDiviver/>
                          <Button style={{width:165}} onPress={hideDialog}><Text style={{color:"#FFF"}}>Thoát</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
                         
                         <Provider>
                          <Portal>
                           <Dialog visible={visible1} onDismiss={hideDialog1} style={{borderRadius:25}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Chúc mừng</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn đã đặt hàng thành công</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={()=>{hideDialog1
                          navigation.navigate("Home")}
                          }><Text style={{color:"#3399FF"}}>ok</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
                         
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  styles_btnthem:
  {
      backgroundColor: "#3399FF"
  }
});
    