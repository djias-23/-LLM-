import request from '../utils/request'

// 获取旅游推荐
export const getTravelRecommend = (data) => {
  return request({
    url: '/api/travel/recommend',
    method: 'post',
    data
  })
}
