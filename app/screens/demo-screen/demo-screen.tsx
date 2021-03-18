import React, { FunctionComponent as Component, memo, useCallback, useEffect, useState } from "react"
import { Observer, observer } from "mobx-react-lite"
import { FlatList, TouchableOpacity, View, Button, Text, Image, Alert, TextInput, ActivityIndicator } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

export const DemoScreen: Component = observer(function DemoScreen() {
  const route: any = useRoute();
  const [load, setLoad] = useState(false);
  const[name,setName]=useState('POST')
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[pageNo,setPage]=useState(route.params.imp)
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const navigation = useNavigation()
  // console.log("navigation ", route.params)
  useEffect(() => {
    check();
   },[]);
   const check=()=>{
     let params = route.params.king;
     if (params) {
         setFirstName(params.first_name);
         setLastName(params.last_name);
         setName('PUT');
     }
   }
  const handleSubmit=async ()=>{
    if(firstName!='' && lastName!='' ){
     console.log(firstName+lastName)
     let obj={firstName,lastName,pageNo}
     if(name=='POST'){
       setLoad(true);
  await userStore.postUserList(obj);
     setLoad(false);
     }else{
       setLoad(true);
       await userStore.putUserList(obj);
       setLoad(false);
       setName('POST')
     }
   }
   else{
     Alert.alert('Enter valid names')
   }
   setFirstName('');
   setLastName('');
   navigation.goBack();
  }
 
  


  return (
    <View>
      
        <TextInput
      placeholder='enter first name'
      value={firstName}
      onChangeText={data=>setFirstName(data)}
      style={{borderWidth:2,marginTop:30,marginHorizontal:20}}
      />
      <TextInput
      placeholder='enter first name'
      value={lastName}
      onChangeText={data=>setLastName(data)}
      style={{borderWidth:2,marginVertical:20,marginHorizontal:20}}
      />
      <Button title={name} onPress={handleSubmit}/>
      {load ? <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'center' }}><ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ fontSize: 24 }}>Loading...</Text></View> : <Text></Text>}
      {/*<Button title='put' onPress={handleput}/>*/}
    </View>
  )
})




