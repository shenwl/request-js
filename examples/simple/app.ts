import request from '../../src/index'

request('/simple/get')

request({
  url: '/simple/get',
  method: 'GET',
})

request({
  url: '/simple/get',
  method: 'get',
})
