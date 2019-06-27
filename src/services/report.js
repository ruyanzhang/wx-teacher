import { requestPost } from '../utils/request'
import config from  '../utils/config'
const { checkReportUrl, notCheckReportUrl, sendReportUrl, saveReportUrl } = config.api;

export async function getCheckReport (data) {
  return requestPost(checkReportUrl,{
    method: 'post',
    data,
  })
}


export async function getNotCheckReport (data) {
  return requestPost(notCheckReportUrl,{
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






