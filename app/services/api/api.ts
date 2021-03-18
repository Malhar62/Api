import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    // this.apisauce.addAsyncRequestTransform(request => async () => {
    //   let authKey = await AsyncStorage.getItem("userToken");
    //   if (authKey) {
    //     request.headers["Authorization"] = 'Bearer ' + authKey
    //   }
    // })
    return this.apisauce;
  }

  /**
   * Get user by id
   */
  /*async getUser(userId: number): Promise<Types.GetUser> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${userId}`)
    console.log("response PO ",response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data, status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }*/
  async getUserList(pageNo: number): Promise<Types.GetUser> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`api/users?page=${pageNo}`)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data, status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async deleteUserList(info): Promise<Types.GetUser> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.delete(`api/users?page=${info.pageNo}`,{
      id:info.id
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    // transform the data into the format we are expecting
    try {
      return { kind: "ok", data: response.data, status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }
  /**
   * Get user by id
   */  async postUserList(obj: any): Promise<Types.GetUser> {
    // make the api call
    
   
      const response: ApiResponse<any> = await this.apisauce.post(`api/users?page=${obj.pageNo}`,{
        id:100,
        email:'mvp@ama.com',
        last_name:obj.firstName,
        first_name:obj.lastName,
        avatar:'no one',
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
        }
        try {
      return { kind: "ok", data: response.data, status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async putUserList(obj: any): Promise<Types.GetUser> {
    // make the api call
    
   
      const response: ApiResponse<any> = await this.apisauce.put(`api/users?page=${obj.pageNo}`,{
        id:100,
        email:'mvp@ama.com',
        last_name:obj.firstName,
        first_name:obj.lastName,
        avatar:'no one',
      },{headers: {"Content-Type": "text/plain"}})
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
        }
        try {
      return { kind: "ok", data: response.data, status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }
    }
