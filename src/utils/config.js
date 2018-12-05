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
    checkReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/get_study_report`,
    coursewareId:`${APIV1}/user/coursewareonline/judge`,
    notCheckReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/get_study_report`,
    updateReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/save_study_report`,
    sendReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/save_study_report`,
    saveReportUrl:`${APIV1}/api/e_lecture/one_to_one/teacher/save_study_report`,
    checkByMonthUrl:`${APIV1}/user/teacher/arrangements/count`,//按月获取上课数
    checkByDayUrl:`${APIV1}/user/teacher/arrangements`,//按天获取上课数
    sendParentYZMUrl:`${APIV1}/user/code`, //家长端验证码接口
    isParentBindUrl:`${APIV1}/user/student/is_bind`, //判斷学生是否綁定
    parentLoginUrl:`${APIV1}/user/student/bind`, //家长端绑定接口
    parentLogoutUrl:`${APIV1}/user/student/unbind`,//家长端解绑接口
    reportList:`${APIV1}/user/student/studyreport/list`,//家长端学习报告list接口
    mistakeList:`${APIV1}/user/student/error_subject_list`,//家长端学习报告list接口
    sendParentReportUrl:`${APIV1}/user/student/studyreport/comment`, //家长端发送学习报告
    parentComment:`${APIV1}/api/e_lecture/one_to_one/studyreport/comment`, //获取家长评价
    mistakeCase:`${APIV1}/user/student/studyreport/error_subject`, //家长端发送学习报告
    mistakeCourse:`${APIV1}/user/student/gradecourse`, //家长端获取错题集科目
    parentCheckReport:`${APIV1}/user/student/studyreport/done/get`, //家长端学习报告接口
    studentListUrl:`${APIV1}/user/student/list`, //家长端绑定那些学生接口
  },
};
