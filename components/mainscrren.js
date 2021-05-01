import React from 'react'

import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View ,Text} from 'react-native'
import{useEffect} from 'react'
import { BottomNavigation } from 'react-native-paper';
import Account from './account';
import {createStore} from 'redux'
import Router_home from '../router_home';
import { Provider} from 'react-redux'
import Router_account from '../router_account';
import Tra from './transfer';
export default  function Mainscreen({navigation,route})
{
React.useEffect(()=>{})
  const id = route.params.id
 
  const name = route.params.name

 
  function counterReducer(state ={id:id,name:name}, action) {
    
    switch (action.type) {
      case 'id':
        return { value:"1" }
      case 'name':
        return { value: "2" }
      default:
        return state
    }
  }
  const store= createStore(counterReducer)
  const [index, setIndex] = React.useState(0);
  const [routes] =React.useState([
    {key:"home_1",title: "Home",icon : 'menu'},
    {key: "account_1", title:"Account", icon:'account'}])
  const renderscene=BottomNavigation.SceneMap({
    home_1:Router_home,
    account_1: Router_account
  });
    return(
      <Provider store={store}>
        <BottomNavigation  barStyle={{backgroundColor:'#FFFFFF'}} navigationState={{index,routes}}
        onIndexChange={setIndex}
        renderScene={renderscene}>

        </BottomNavigation>
        </Provider>
    )
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }
)