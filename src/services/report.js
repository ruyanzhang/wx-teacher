import {request,requestPost} from '../utils/request'
import config from  '../utils/config'
const {learningCase,checkReportUrl,notCheckReportUrl,sendReportUrl,saveReportUrl,updateReportUrl,mistakeCase} = config.api;

export async function getLearningCase (data) {
  return requestPost(learningCase,{
    method: 'get',
    data,
  })
}
export async function getMistakeCase (data) {
  return requestPost(mistakeCase,{
    method: 'get',
    data,
  })
}
export async function getCheckReport (data) {
  return requestPost(checkReportUrl,{
    method: 'get',
    data,
  })
}


export async function getNotCheckReport (data) {
  return requestPost(notCheckReportUrl,{
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


export async function saveReport (data) {
  return requestPost(saveReportUrl,{
    method: 'post',
    data,
  })
}






