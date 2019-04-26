import request from '@/utils/request'

export function fetchUserList(url,data) {
  return request({
    url: url,
    method: 'get',
    data
  })
}