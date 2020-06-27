import request from '@/utils/request'

export const getActivityList = data => request.get('/activity/page', data)
export const addActivity = data => request.post('/activity', data)
export const editActivity = data => request.put('/activity', data)
export const getAtivityById = id => request.get('/activity/' + id)

export const uploadFile = data => request.file('/image/photos', data)
export const addQa = data => request.post('/qa', data)
export const putQa = data => request.put('/qa', data)
export const getQa = id => request.get('/qa/act/' + id)
export const delQa = data => request.delete('/qa', data)

export const addImage = data => request.post('/image/photos', data)
export const putImage = data => request.put('/image', data)
export const delImage = data => request.delete('/image', data)
export const getSwiper = id => request.get('/image/' + id)
