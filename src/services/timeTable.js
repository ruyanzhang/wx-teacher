import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const { checkByMonthUrl,checkByDayUrl } = config.api;

export async function checkByMonth (data) {
  return request(checkByMonthUrl,{
    method: 'get',
    data
  })
}
export async function checkByDay (data) {
  return request(checkByDayUrl,{
    method: 'get',
    data
  })
}






