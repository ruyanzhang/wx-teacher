import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const {reportList,mistakeList,mistakeCourse,studentListUrl} = config.api;

export async function getReportList (data) {
  return request(reportList,{
    method: 'get',
    data,
  })
}
export async function getMistakeList (data) {
  return request(mistakeList,{
    method: 'get',
    data,
  })
}
export async function getStudentList (data) {
  return request(studentListUrl,{
    method: 'get',
    data,
  })
}
export async function getMistakeCourse (data) {
  return request(mistakeCourse,{
    method: 'get',
    data,
  })
}











