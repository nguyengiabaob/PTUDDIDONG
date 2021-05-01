import React from 'react'
import {MaterialIcons} from 'react-native-vector-icons'

import { View,Dimensions,Text,TouchableOpacity,TextInput,Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'
import { set } from 'react-native-reanimated'
const windows=Dimensions.get('window')

export default function Edit_detail({navigation,route})
{
const db= firestore().collection('tbl_water')
const [listspp,setlistspp]= React.useState([])
const [tensanpham, settensanpham]= React.useState("")
const [gia, setgia]= React.useState("")
const [soluong, setsoluong]= React.useState("")
const image_start=require('../images/download.png')
const [photo,setphoto]= React.useState(image_start)

 React.useEffect(()=>{
    return db.onSnapshot(querysnapshot=>{
      const list=[]
      querysnapshot.forEach(doc=>{
        const {id_water,name_water,price_water,number,image}= doc.data()
        console.log(name_water)
        list.push({
            id: doc.id,
            id_water,
            name_water,
            price_water,
            number,
            image
        })
      })
      console.log(list)
      setlistspp(list)
    
    })
  },[])

 let id = route.params.id
 let ten= route.params.ten
 let giasp= route.params.gia
 let sl= route.params.soluong
 let hinh= route.params.hinh
 console.log(id)
 const Handelchoosephoto=()=>{ 
        const option ={
    
        };
        launchImageLibrary(option,response=>{console.log(response)
        if(response.uri)
    {
        
        setphoto({uri:response.uri})
    }})
       
    }


    // if(photo===image_start)
    // {
    async function capnhat()
    {
        
    //     if(photo!=image_start&&(tensanpham!=""&&gia!=""&&soluong!=""))
    //     {
    //      console.log(tensanpham)
    //     console.log(photo)
    //     await db
    //     .doc(id)
    //     .update({name_water:tensanpham,
    //     price_water:gia,
    //     number:soluong,
    //     image:photo
    //     })
    //  }
     if(photo!=image_start)
     {
        await db
        .doc(id)
        .update({
        image:photo
        }) 
     }
     if(tensanpham!="")
     {
        await db
        .doc(id)
        .update({
        name_water:tensanpham

        }) 
     }
     if(gia!="")
     {
        await db
        .doc(id)
        .update({
        price_water:gia
        }) 
     }
     if(soluong!="")
     {
        await db
        .doc(id)
        .update({
        number :soluong
        }) 
     }
    //  else if(tensanpham!=""||gia!=""||soluong!=""||photo==image_start)
    //  {
    //     console.log(tensanpham)
    //     await db
    //     .doc(id)
    //     .update({name_water:tensanpham,
    //     price_water:gia,
    //     number:soluong,
     
    //     })
    //  }
      
    }

// else
// {
    
//     async function capnhat()
//     {
//         console.log(photo)
//         await firestore()
//         .collection('tbl_water')
//         .doc(id)
//         .update({name_water:tensanpham,
//         price_water:gia,
//         number:soluong,
//         image:photo})
//     }
// }
// }
    return(
        <View>
            
          <View style={{borderColor:"#D3D3D3", borderWidth:3,borderRadius:10, height:500,backgroundColor:"#FFF"}}>
          <View style={{marginTop:10}}  >
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Tên sản phẩm </Text>
                
                <TextInput onChangeText={(text)=>{settensanpham(text)}} style={{marginTop:5,width:380,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3}} >{ten}</TextInput>
          </View>
          <View style={{marginTop:30}} >
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Giá </Text>
                
                <TextInput  onChangeText={(text)=>{setgia(text)}} style={{marginTop:5,width:150,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3}} >{giasp}</TextInput>
          </View>
          <View  style={{marginTop:30}}>
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Số Lượng </Text>
                
                <TextInput  onChangeText={(text)=>{setsoluong(text)}}  keyboardType="numeric"  style={{marginTop:5,width:150,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3}} >{sl}</TextInput>
          </View>
          <View style={{marginTop:30, flexDirection:'row'}}>
              <Image style={{ marginLeft:20,height:121, width:157}}source={photo}></Image>
              <TouchableOpacity onPress={()=>{Handelchoosephoto()}} style={{ height:50,justifyContent:'center', marginLeft:100,alignItems:'center',alignSelf:'center' }}>
                    <MaterialIcons name="add-a-photo" size={35} color="#fb0b0b"></MaterialIcons>
                    <Text>Add photo </Text>
              </TouchableOpacity>
          </View>
         
          </View>
          <View style={{alignItems:'center',marginTop:5,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity style={{alignItems:'center',backgroundColor:"#ff1414e8",width:150,borderRadius:80,flexDirection:"row", justifyContent:'center'}}onPress={()=>{
              capnhat()
              }}>
              
              <Text style={{color:'#FFF',alignSelf:'center', fontSize:15,fontWeight:'bold',padding:5}}>Xác nhận</Text>
            </TouchableOpacity>
        
            </View>
        </View>
    )
}