import request from '@/utils/request'

export const getCouponById = id => request.get('/coupon/' + id)
