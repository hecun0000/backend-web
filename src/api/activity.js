import request from '@/utils/request'

export const getActivityList = data => request.get('/activity/page', data)
export const addActivity = data => request.post('/activity', data)
export const editActivity = data => request.put('/activity', data)
export const uploadFile = data => request.file('/image/', data)
