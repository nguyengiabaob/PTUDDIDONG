import React from 'react'
import {MaterialIcons} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { View,Dimensions,Text,TouchableOpacity,TextInput,Image, ImageBackground } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
const windows=Dimensions.get('window')

export default function Edit_water()
{
const db= firestore().collection('tbl_water')
const image_start=require('../images/download.png')
const [photo,setphoto]= React.useState(image_start)
const [tensanpham, settensanpham]= React.useState("")
const [gia, setgia]= React.useState(0)
const [listspp,setlistspp]= React.useState([])
const [soluong, setsoluong]= React.useState(0)  
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
async function them() 
{   const len= listspp.length
    await firestore().collection('tbl_water')
    .add(
        {
            id_water:`MA 0${len+1}`,
            name_water:tensanpham,
            price_water:Number.parseInt(gia),
            number: Number.parseInt(soluong),
            image:photo
        }
    )
}
const Handelchoosephoto=()=>{
        const option ={
    
        };
        launchImageLibrary(option,response=>{console.log(response)
        if(response.uri)
    {
        
        setphoto({uri:response.uri})
    }})
       
    }
    return(
        <View>
         <ImageBackground style={{width:windows.width}} source={require("../images/cloud.png")} >
          <View style={{borderColor:"#D3D3D3", borderWidth:3,borderRadius:10, height:500}}>
          <View style={{marginTop:10}}  >
                <Text   style={{color:"#FFF",fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Tên sản phẩm </Text>
                
                <TextInput onChangeText={(text)=>{settensanpham(text)}} style={{marginTop:5,width:380,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3,backgroundColor:"#FFF"}} ></TextInput>
          </View>
          <View style={{marginTop:30}} >
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic',color :"#FFF"}}>Giá </Text>
                
                <TextInput onChangeText={(text)=>{setgia(text)}} style={{backgroundColor:"#FFF",marginTop:5,width:150,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3}} ></TextInput>
          </View>
          <View  style={{marginTop:30}}>
                <Text style={{color:"#FFF",fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Số Lượng </Text>
                
                <TextInput onChangeText={(text)=>{setsoluong(text)}}  keyboardType="numeric"   style={{backgroundColor:"#FFF",marginTop:5,width:150,borderRadius:10,height:50,borderColor:"#D3D3D3",borderWidth:3}} ></TextInput>
          </View>
          <View style={{marginTop:30, flexDirection:'row'}}>
              <Image style={{ marginLeft:20,height:121, width:157}}source={photo}></Image>
              <TouchableOpacity onPress={()=>{Handelchoosephoto()}} style={{ height:50,justifyContent:'center', marginLeft:100,alignItems:'center',alignSelf:'center' }}>
                    <MaterialIcons name="add-a-photo" size={35} color="#FFF"></MaterialIcons>
                    <Text style={{fontWeight:'bold',color:"#141515"}}>Add photo </Text>
              </TouchableOpacity>
          </View>
         
          </View>
          <View style={{alignItems:'center',marginTop:5,borderColor:"#D3D3D3",borderWidth:3,height:70,justifyContent:'center', backgroundColor:"#FFF"}}>
          <TouchableOpacity style={{alignItems:'center',backgroundColor:"#ff1414e8",width:150,borderRadius:80,flexDirection:"row", justifyContent:'center'}}onPress={()=>{them()}}>
              
              <Text style={{color:'#FFF',alignSelf:'center', fontSize:15,fontWeight:'bold',padding:5}}>Thêm</Text>
            </TouchableOpacity>
        
            </View>
         </ImageBackground>
        </View>
    )
}
