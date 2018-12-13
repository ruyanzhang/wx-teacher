import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const {reportListUrl,mistakeListUrl,mistakeCourseUrl} = config.api;

export async function getReportList (data) {
  return requestPost(reportListUrl,{
    method: 'post',
    data,
  })
}
export async function getMistakeList (data) {
  return requestPost(mistakeListUrl,{
    method: 'post',
    data,
  })
}

export async function getMistakeCourse (data) {
  return requestPost(mistakeCourseUrl,{
    method: 'post',
    data,
  })
}












