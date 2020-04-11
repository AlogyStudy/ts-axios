import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
    method: 'get',

    timeout: 0,

    headres: {
        common: {
            Accpet: 'application/json, text/plain, */*'
        }
    }
}

const methodNoData = ['delete', 'get', 'head', 'options']
methodNoData.map(method => {
    defaults.headres[method] = {}
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.map(method => {
    defaults.headres[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults
