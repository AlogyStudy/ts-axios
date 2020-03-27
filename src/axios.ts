import { AxiosInatance } from './types'
import Axios from './code/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInatance {
  const context = new Axios()
  const instance = Axios.prototype.requset.bind(context)

  // 拷贝
  extend(instance, context)
  return instance as AxiosInatance
}

const axios = createInstance()

export default axios
