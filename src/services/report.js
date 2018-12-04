import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const {notCheckList,checkList,learningCase,checkReportUrl,notCheckReportUrl,sendReportUrl,saveReportUrl,updateReportUrl,qiniuken,
  coursewareId,sendParentReportUrl,mistakeCase,parentComment,parentCheckReport} = config.api;

export async function getNotCheckList (data) {
  return request(notCheckList,{
    method: 'get',
    data,
  })
}
export async function getCheckList (data) {
  return request(checkList,{
    method: 'get',
    data,
  })
}
export async function getLearningCase (data) {
  return request(learningCase,{
    method: 'get',
    data,
  })
}
export async function getMistakeCase (data) {
  return request(mistakeCase,{
    method: 'get',
    data,
  })
}
export async function getCheckReport (data) {
  return request(checkReportUrl,{
    method: 'get',
    data,
  })
}
export async function getParentCheckReport (data) {
  return request(parentCheckReport,{
    method: 'get',
    data,
  })
}

export async function getNotCheckReport (data) {
  return request(notCheckReportUrl,{
    method: 'get',
    data,
  })
}
export async function updateReport (data) {
  return requestPost(updateReportUrl,{
    method: 'post',
    data,
  })
}
export async function sendReport (data) {
  return requestPost(sendReportUrl,{
    method:'post',
    data,
  })
}
export async function sendParentReport (data) {
  const appid = sessionStorage.getItem('appid');
  const openid = sessionStorage.getItem('openid');
  return requestPost(sendParentReportUrl+'?appid='+appid+'&openid='+openid,{
    method: 'post',
    data,
  })
}

export async function saveReport (data) {
  return requestPost(saveReportUrl,{
    method: 'post',
    data,
  })
}
export async function getQiniuken () {
  return request(qiniuken,{
    method: 'get'
  })
}
export async function getCoursewareId (data) {
  return request(coursewareId,{
    method: 'get',
    data
  })
}
export async function getParentComment (data) {
  return request(parentComment,{
    method: 'get',
    data
  })
}








