import request from '../../src/index'

request('/simple/get')

request({
  url: '/simple/get',
  params: {
    foo: ['bar', 'baz']  
  }
})

request({
  url: '/simple/get',
  params: {
    foo: {
      bar: 'bar',
      baz: 'baz',
    }
  }
})

request({
  url: '/simple/get',
  params: {
    date: new Date()
  }
})
