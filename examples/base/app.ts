import axios from '../../src/index'
import { readSync } from 'fs'

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: ['bar', 'baz']
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: {
//             bar: 'baz'
//         }
//     }
// })


// axios({
//     method: 'post',
//     url: '/base/post',
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const arr = new Int32Array([12, 32])

// axios({
//     url: '/base/buffer',
//     method: 'post',
//     data: arr
// })


axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res, 'res')
})

axios({
    method: 'post',
    url: '/base/post',
    headres: {
        'content-type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
    },
    data: {
        a: 1,
        b: 2222
    }
})

const paramsString = 'q=URLUtils.searchPramas&topic=api'
const searchPramas = new URLSearchParams(paramsString)

axios({
    method: 'post',
    url: '/base/post',
    data: searchPramas
})