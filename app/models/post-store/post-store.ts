import { Instance, SnapshotOut, types,flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";

/**
 * Model description here for TypeScript hints.
 */
const PostModel = types
  .model("PostModel")
  .props({
    id: types.maybeNull(types.optional(types.number, 0)),
    // id: types.identifier,
    title: types.maybeNull(types.optional(types.string, "")),
    body: types.maybeNull(types.optional(types.string, "")),
    userId: types.optional(types.number, 0),
   
  })
export const PostStoreModel = types
  .model("PostStore")
  .props({    posts: types.optional(types.array(PostModel), []),
  })
  .views(self => ({})) 
  .actions(self => ({
    setUser(user) {
      self.posts = user
    }
  }))
  .actions(self => ({
    getPost: flow(function* getPost() {
      try {
        const data = yield self.environment.api.getPost();//data.kind and data.data and data.status
        const response = data;
        if (data.kind === "ok" && data.status == 200) {
          var mergeList = [...self.posts, ...response.data.data]
          // self.users = mergeList
          self.setUser(mergeList)
          return { response: true, data: response.data };
        }
        else {
          self.isLoading = false;
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        return { response: false, message: "Something went wrong." };
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}
