import { PostStoreModel } from "../post-store/post-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import {UserStoreModel} from '../user-store/user-store';
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  postStore: types.optional(PostStoreModel, {}),
  userStore: types.optional(UserStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
