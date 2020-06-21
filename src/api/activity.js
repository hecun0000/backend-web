import request from '@/utils/request'

export const getActivityList = data => request.get('/activity/pag', data)
