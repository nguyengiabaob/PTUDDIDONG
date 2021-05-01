import React from 'react'
import { View, Image,Text,TouchableOpacity   } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {FontAwesome5} from 'react-native-vector-icons'
import {Ionicons} from 'react-native-vector-icons'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import {Feather,Entypo} from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { Dialog, Portal, Title,Paragraph, Provider, Button } from 'react-native-paper';
export default function Edit({navigation})
{
  const db= firestore().collection('tbl_water')
  const [listspp,setlistspp]= React.useState([])
  const [id_xoa, setid] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
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
async function deleted( id)
{
  await db.doc(id).delete().then(hideDialog())
}
    return(
        <View>
            <ScrollView>
            {listspp.map(item=>(
              <View key={item.id} style={{borderColor:"#D3D3D3",borderWidth:3,justifyContent:'center'}}>
               
                <View  key={item.id}
                style={{height:88, paddingLeft:25,paddingRight:35,flexDirection:'row',alignItems:'center',marginBottom:15}}>
                     <Image style={{width:80,height:80}} source={item.image}>

                    </Image>  
                    <View style={{marginLeft:3,marginTop:5}}> 
                      <Text style={{marginTop:5,marginBottom:20, fontSize:18,color:"#0c0c0ce8",fontWeight:'bold',width:160}}>{item.name_water}</Text>
                      <Text style={{marginBottom:10,fontSize:13 ,color:"#585858",fontStyle:'italic',fontWeight:'bold'}}> Số lượng :{item.number }</Text>
                      <Text style={{fontSize:18,color:"#00AA00",fontStyle:'italic',fontWeight:'bold'}}> Giá :{item.price_water} Đ</Text>
                    </View>
                    <View style={{flexDirection:'row', marginLeft: 28}}>
                      
                      <TouchableOpacity onPress={()=>{navigation.navigate("Chỉnh sửa",{id:item.id,ten:item.name_water,gia:item.price_water,soluong:item.number,hinh:item.image})}} style={{ backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          
                         <Entypo name="edit" size={25} color="#FFF"></Entypo>

                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{ setid(item.id)
                        showDialog()}}  style={{marginLeft:15, backgroundColor:"#3399FF", width:35, height:35,justifyContent:'center',alignItems:"center",borderRadius:80,}}>
                          <MaterialCommunityIcons name="delete" color="#fff" size={25}></MaterialCommunityIcons>
                          
                      </TouchableOpacity>
                      
                    </View>
                    
                </View>
                
              </View>
              
              ))}
             
            </ScrollView>
            <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25,marginBottom:100}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Thông báo</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:"#FFF",justifyContent:"center",alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn có muốn xóa sản phẩm này không ?</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:"center",justifyContent:"center"}}>
                          <Button onPress={()=>{deleted(id_xoa)}}><Text style={{color:"#3399FF"}}>Yes</Text></Button>
                          <Button onPress={hideDialog}><Text style={{color:"#3399FF"}}>No</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider>
        </View>
    )
}