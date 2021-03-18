import React, { FunctionComponent as Component, memo, useCallback, useEffect, useState } from "react"
import { Observer, observer } from "mobx-react-lite"
import { FlatList, TouchableOpacity, View, Button, Text, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { props } from "ramda"





export const UsersScreen: Component = observer(function UsersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [pageNo, setPage] = useState(1)
  const [counter, setCouner] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [filteredUser, setFilteredUser] = useState([])



  // Pull in one of our MST stores
  const { userStore } = useStores()
  const navigation = useNavigation()
  const route: any = useRoute();
  // console.log("navigation ", route.params)



  useEffect(() => {
    if (pageNo > 1) callApiGetUser()
  }, [pageNo])



  const callApiGetUser = async (showLoader: boolean = true) => {
    setLoading(true)
    await userStore.getUserList(pageNo);
    setLoading(false)
    //  console.log("a ",a)
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1)
    setRefreshing(false);
  };




  const onEndReached = () => {
    if (!userStore.isLoading && pageNo < userStore.totalPage) {
      setPage(pageNo + 1)
    }
  };

  const extractKey = useCallback(
    ({ id }) => '' + id,
    [],
  );

  const handledelete = async (id) => {
    let info = { id, pageNo }
    await userStore.deleteUserList(info);
  }

  return (
    <View>
       <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:20 }}>
        <View style={{ width: 100,marginRight:20 }}> 
        <Button title='POST' onPress={() => navigation.navigate('demo', { imp: pageNo })} />
        </View>
        <View style={{ width: 100 ,marginLeft:20}}>
          <Button title='GET' onPress={() => callApiGetUser()} />
      </View>
      </View>
      <FlatList
        data={userStore.users}
        // extraData={userStore.users}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', borderWidth: 2, marginHorizontal: 10, marginTop: 20, backgroundColor: 'maroon' }}>
            <View>
              <TouchableOpacity onPress={() => handledelete(item.id)}>
                <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50 }} />
                <Text style={{ fontSize: 20, color: 'white' }}>{item.id}</Text>
                <Text style={{ fontSize: 20, color: 'white' }}>{item.first_name}</Text>
                <Text style={{ fontSize: 20, color: 'white' }}>{item.email}</Text>
                <Text style={{ fontSize: 20, color: 'white' }}>{item.last_name}</Text>
              </TouchableOpacity>
            </View>
            <View style={{position:'absolute',marginLeft:280,marginTop:50}}>
              <TouchableOpacity onPress={() => {
                /*let ind = {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                  avatar: item.avatar,
                }*/
                navigation.navigate('demo', { king: item })
              }}><Text style={{ fontSize: 20, color: 'white',textDecorationLine:'underline' }}>UPDATE</Text></TouchableOpacity>

            </View></View>
        )}
        keyExtractor={extractKey}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  )
})




