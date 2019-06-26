import { requestPost } from '@/utils/request'
import config from  '@/utils/config'
import { getToken } from "@/utils"
const { reportListUrl, mistakeListUrl, mistakeCourseUrl } = config.api

export async function getReportList (data) {
  return requestPost(reportListUrl,{
    method: 'post',
    data: {
      ...data,
      token: getToken()
    },
  })
}
export async function getMistakeList (data) {
  return requestPost(mistakeListUrl,{
    method: 'post',
    data: {
      ...data,
      token: getToken()
    },
  })
}

export async function getMistakeCourse (data) {
  return requestPost(mistakeCourseUrl,{
    method: 'post',
    data: {
      ...data,
      token: getToken()
    },
  })
}












