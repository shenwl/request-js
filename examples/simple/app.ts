import request from '../../src/request'

request('/simple/get')

request({
  url: '/simple/get',
  method: 'GET',
}).then(res => {
  console.log(res)
}).catch(() => {})

request({
  url: '/simple/get',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch(() => {})
