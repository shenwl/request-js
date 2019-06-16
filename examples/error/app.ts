import request from '../../src/request'


request({
  url: '/error/get',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

request({
  url: '/error/timeout',
  method: 'get',
  timeout: 2000,
}).then(res => {
  console.log(res)
}).catch((e) => {
  console.log('error message: ', e.message)
  console.log('error config: ', e.config)
  console.log('error request: ', e.request)
})
