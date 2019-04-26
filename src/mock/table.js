import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cname',
    "age|20-50": 50,
    address: '@county(true)'
  }))
}

export default {
  getList: config => {
    const { pageNum = 1, pageSize = 10 } = param2Obj(config.url)
    const pageList = List.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

    return {
      total: List.length,
      list: pageList
    }
  }
}
