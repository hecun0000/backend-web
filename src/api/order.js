import request from '@/utils/request'

// export const getOrderList = data => request.get('/order/page', data)
export const getOrderList = data => request.get('/order/condition', data)
