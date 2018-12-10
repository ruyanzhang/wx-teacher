import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const {reportListUrl,mistakeListUrl} = config.api;

export async function getReportList (data) {
  return request(reportListUrl,{
    method: 'get',
    data,
  })
}
export async function getMistakeList (data) {
  console.log(data)
  return request(mistakeListUrl,{
    method: 'get',
    data,
  })
}












