import request from '../../src/index'

request({
  url: '/body/post',
  method: 'POST',
  data: {
    foo: 'foo',
    bar: 'bar',
  }
})

request({
  url: '/buffer/post',
  method: 'POST',
  data: {
    buf: new Int32Array([1, 0, 31, 23]),
  },
  headers: {
    'Content-Type': 'application/octet-stream'
  }
})



