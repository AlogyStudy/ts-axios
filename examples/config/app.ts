import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headres.common['test2'] = 123

axios({
    url: '/config/post',
    method: 'post',
    data: qs.stringify({a: 1}),
    headres: {
        test: 321
    }
}).then(res => {
    console.log(res.data)
})
