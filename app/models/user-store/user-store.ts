import {  flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { omit } from "ramda";
import { Alert } from "react-native";
import { withEnvironment } from "../extensions/with-environment";


const UserModel = types
  .model("UserModel")
  .props({
    id: types.maybeNull(types.optional(types.number, 0)),
    // id: types.identifier,
    avatar: types.maybeNull(types.optional(types.string, "")),

    last_name: types.maybeNull(types.optional(types.string, "")),
    first_name: types.maybeNull(types.optional(types.string, "")),
    email: types.maybeNull(types.optional(types.string, "")),
    //gender: types.optional(types.string, ""),
    //status: types.optional(types.string, ""),
    //created_at: types.optional(types.string, ""),
    //updated_at: types.optional(types.string, ""),
    isSelected: types.optional(types.boolean, false)
  })

export const UserStoreModel = types
  .model("UserStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    users: types.optional(types.array(UserModel), []),
    totalPage: types.optional(types.number, 0)
  })
  .extend(withEnvironment)
  .views(self => ({}))
  .actions(self => ({
    setUser(user) {
      self.users = user
    }
  }))
  .actions(self => ({
    toggle: flow(function* toggle(index) {
      self.users[index].isSelected = !self.users[index].isSelected;
    }),
    seeUser(num){
      console.log('reached '+num);
    },
    // Login Api
    getUserList: flow(function* getUserList(pageNo) {
      try {
        self.isLoading = true;
        const data = yield self.environment.api.getUserList(pageNo);//data.kind and data.data and data.status
        const response = data;
        if (data.kind === "ok" && data.status == 200) {
          self.isLoading = false;
          var mergeList = [...self.users, ...response.data.data]
          if (pageNo == 1) mergeList = [...response.data.data]
          // self.users = mergeList
          self.setUser(mergeList)
          self.totalPage = response.data.total
          return { response: true, data: response.data };
        }
        else {
          self.isLoading = false;
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
  

    postUserList: flow(function* postUserList(obj) {
      try {
        self.isLoading = true;
        const data = yield self.environment.api.postUserList(obj);//data.kind and data.data and data.status
        const response = data;
          /*self.isLoading = false;
          var mergeList = [...self.users,...response.data.data]
          if (obj.pageNo == 1) mergeList = [...response.data.data]
          // self.users = mergeList
          self.setUser(mergeList)*/
          if(data.kind=='ok'){
            Alert.alert('posted successfully with code :'+data.status)
          }else{
            Alert.alert('error')
          }
          console.log('kind= '+data.kind)
          console.log('status= '+data.status)
          console.log(data.data)
          return { response: true, data: response.data };
        }
       catch (error) {
        console.log(error+'Malhar@123')
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
    
    putUserList: flow(function* putUserList(obj) {
      try {
        self.isLoading = true;
        const data = yield self.environment.api.putUserList(obj);//data.kind and data.data and data.status
        const response = data;
          /*self.isLoading = false;
          var mergeList = [...self.users, ...response.data.data]
          if (obj.pageNo == 1) mergeList = [...response.data.data]
          // self.users = mergeList
          self.setUser(mergeList)*/
          if(data.kind=='ok'){
            Alert.alert('updated successfully with code :'+data.status)
          }else{
            Alert.alert('error')
          }
          console.log('kind= '+data.kind)
          console.log('status= '+data.status)
          console.log(data.data)
          return { response: true, data: response.data };
        }
       catch (error) {
        console.log(error+'Malhar@123')
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
    deleteUserList: flow(function* deleteUserList(info) {
      try {
        self.isLoading = true;
        const data = yield self.environment.api.deleteUserList(info);//data.kind and data.data and data.status
        const response = data;
          /*self.isLoading = false;
          var mergeList = [...self.users, ...response.data.data]
          if (obj.pageNo == 1) mergeList = [...response.data.data]
          // self.users = mergeList
          self.setUser(mergeList)*/
          if(data.kind=='ok'){
            Alert.alert('deleted id : '+info.id+' code: '+data.status)
          }else{
            Alert.alert('error')
          }
          console.log('kind= '+data.kind)
          console.log('status= '+data.status)
          console.log(data.data)
          self.totalPage=response.data.total
          return { response: true, data: response.data };
        }
       catch (error) {
        console.log(error+'Malhar@123')
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */
  // 
  .postProcessSnapshot(omit(["users"]))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType { }
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType { }
