const serveUrl = '';
const APIV1 =`${serveUrl}/api`;
export default {
  name: '',
  prefix: '',
  footerText: '',
  logoSrc: '',
  logoText: '',
  needLogin: true,
  api: {
    userLogin: `${APIV1}/login`, //登录
    getDayUrl:`${APIV1}/teacher/day`,//按天获取上课
    getMonthUrl:`${APIV1}/teacher/month`,//按月获取上课
    reportListUrl:`${APIV1}/teacher/report_list`,//学习报告
    mistakeListUrl:`${APIV1}/teacher/mistake_list`,//错题集
    mistakeCourseUrl:`${APIV1}/student/gradecourse`, //获取错题集科目
    notCheckReportUrl:`${APIV1}/student/notCheckReport`, //未核录报告
    saveReportUrl:`${APIV1}/student/save_report`, //保存报告
    checkReportUrl:`${APIV1}/student/checkReport`, //已检测报告

    qiniuken:`${APIV1}/teacherplatform/api/qidicloud/courseware/get_qiniu_token`, //获取qiniu的token
    userGetOpenId:`${APIV1}/authorization/webPage/code`, //获取openId
    sendYZMUrl:`${APIV1}/user/login/sms`, //验证码接口
    restartBinddUrl:`${APIV1}/user/teacher/rebind`, //重新绑定验证码接口
    isBindUrl:`${APIV1}/user/teacher/is_bind`, //判斷用戶是否綁定
    userLogout: `${APIV1}/user/teacher/unbind`, //用户解绑
    userGetLogo: `${APIV1}/user/logo`,  //获取公司logo
    notCheckList:`${APIV1}/user/teacher/studyreport/undone`,
    checkList:`${APIV1}/user/teacher/studyreport/done`,
    learningCase:`${APIV1}/user/coursewareonline/get`,
    coursewareId:`${APIV1}/user/coursewareonline/judge`,
    updateReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/save_study_report`,
    sendReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/save_study_report`,

  },
};
