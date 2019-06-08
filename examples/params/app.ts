import request from '../../src/index'

request({
  url: '/params/get',
  params: {
    foo: ['bar', 'baz']
  }
})

request({
  url: '/params/get',
  params: {
    foo: {
      bar: 'bar',
      baz: 'baz',
    }
  }
})

request({
  url: '/params/get',
  params: {
    date: new Date()
  }
})
