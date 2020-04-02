import axios from '../../src/index'

axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hello world'
    }
})

axios.request({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi world'
    }
})

axios.get('/extend/get')

axios.post('/extend/post', {data: 'post'})


axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi'
    }
})

axios('/extend/post', {
    method: 'post',
    data: {
        msg: 'hello'
    }
})
