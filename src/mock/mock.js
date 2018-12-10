import Mock from 'mockjs';
import config from '../utils/config';
const {userLogin,getDayUrl,getMonthUrl,reportList,mistakeList} = config.api;
const Random = Mock.Random;
Mock.mock(userLogin,{
  "user":/[a-z]{6,20}/,
  "token":/\d{40}/,
});
Mock.mock(getDayUrl,{
  "count|0-20":15,
  "list|0-20": [
    {
      "classCourseName|1":['一对一语文数学化学','一对二数学','一对多英语化学','一对三语文数学化学物理','一对一生物数学化学','一对二生物数学语文','一对四地理生物数学语文'],
      "timeFrom":Random.datetime('yyyy-MM-dd HH:mm'),
      "timeTo":Random.datetime('yyyy-MM-dd HH:mm'),
      "classroomStatus|1":[0,1,2,3],
      "subschoolName|1":['东风西校区','天河体育西校区','鹭江校区','大学城校区','小北花圈校区','中大校区','北京路校区','三元里校区'],
      "classroomName|1":['403课室','509课室','201课室','203课室','301课室','303课室'],
    }
  ]
});
Mock.mock(getMonthUrl,{
  "count|0-20":15,
  "list|0-20": [
    {
      "classCourseName|1":['一对一语文数学化学','一对二数学','一对多英语化学','一对三语文数学化学物理','一对一生物数学化学','一对二生物数学语文','一对四地理生物数学语文'],
      "timeFrom":Random.datetime('yyyy-MM-dd HH:mm'),
      "timeTo":Random.datetime('yyyy-MM-dd HH:mm'),
      "classroomStatus|1":[0,1,2],
      "subschoolName|1":['东风西校区','天河体育西校区','鹭江校区','大学城校区','小北花圈校区','中大校区','北京路校区','三元里校区'],
      "classroomName|1":['403课室','509课室','201课室','203课室','301课室','303课室'],
    }
  ]
});
Mock.mock(reportList,{
  "count|0-20":15,
  "list|0-20": [
    {
      "classCourseName|1":['一对一语文数学化学','一对二数学','一对多英语化学','一对三语文数学化学物理','一对一生物数学化学','一对二生物数学语文','一对四地理生物数学语文'],
      "timeFrom":Random.datetime('yyyy-MM-dd HH:mm'),
      "timeTo":Random.datetime('yyyy-MM-dd HH:mm'),
      "classroomStatus|1":[0,1,2],
      "subschoolName|1":['东风西校区','天河体育西校区','鹭江校区','大学城校区','小北花圈校区','中大校区','北京路校区','三元里校区'],
      "classroomName|1":['403课室','509课室','201课室','203课室','301课室','303课室'],
    }
  ]
});
Mock.mock(mistakeList,{
  "count|0-20":15,
  "list|0-20": [
    {
      "classCourseName|1":['一对一语文数学化学','一对二数学','一对多英语化学','一对三语文数学化学物理','一对一生物数学化学','一对二生物数学语文','一对四地理生物数学语文'],
      "timeFrom":Random.datetime('yyyy-MM-dd HH:mm'),
      "timeTo":Random.datetime('yyyy-MM-dd HH:mm'),
      "classroomStatus|1":[0,1,2],
      "subschoolName|1":['东风西校区','天河体育西校区','鹭江校区','大学城校区','小北花圈校区','中大校区','北京路校区','三元里校区'],
      "classroomName|1":['403课室','509课室','201课室','203课室','301课室','303课室'],
    }
  ]
});
