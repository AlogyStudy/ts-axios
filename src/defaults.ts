import { AxiosRequestConfig } from "./types";
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
    method: 'get',

    timeout: 0,

    headers: {
        common: {
            Accpet: 'application/json, text/plain, */*'
        }
    },

    transformRequest: [
        function(data: any, headers: any): any {
            processHeaders(headers, data)
            return transformRequest(data)
        }
    ],

    transformResponse: [
        function(data: any): any {
            return transformResponse(data)
        }
    ]
}

const methodNoData = ['delete', 'get', 'head', 'options']
methodNoData.map(method => {
    defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.map(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults
