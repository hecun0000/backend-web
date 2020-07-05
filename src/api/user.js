import request from '@/utils/request'

export function login (data) {
  return request.post('/user/login',
    data
  )
}

export function getInfo (token) {
  return request.get('/user/info',
    { token }
  )
}

export function logout () {
  return request.post('/user/logout'
  )
}

export const getUserList = data => request.get('/user-info/page', data)
export const getCouponById = id => request.get('/coupon/' + id)
export const couponWirte = data => request.put('/coupon/writeoff', data)
