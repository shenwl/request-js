import request from '../../src'


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
  console.log(e)
})
