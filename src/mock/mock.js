import Mock from 'mockjs';
import config from '../utils/config';
const {userLogin,getDayUrl,getMonthUrl,reportListUrl,mistakeListUrl,mistakeCourseUrl} = config.api;
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
Mock.mock(reportListUrl,{
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
Mock.mock(mistakeListUrl,{
  "count|0-20":15,
  "list|5-10": [
    {
      "id":/[a-z\d-]{40}/,
      "content|1":[
        'I couldn’t do anything but stand and stare. Then a man approached me and asked ______ I wanted myngings back.',
        'He was greeted by the city mouse cheerfully. The country mouse was surprised ______ big the house was.',
        'The rabbit dug a tunnel right to ______ the dog had been lying all the time.',
        'However, there are fears ______ Chinglish could be killed off because some people are worried that Chinglish may embarrass foreign visitors.',
        'The rabbit dug a tunnel right to ______ the dog had been lying all the time.'
      ],
      "analysis|1":[
        '由从句前的及物动词imagine可以得知后面是个宾语从句，再根据从句be like缺宾语的特征判断，这里应该填一个连接代词what，表示“像什么样子。',
        '考查宾语从句，作ask的宾语，从句中不缺成分，一个男人靠近我问我是否想要回我的东西。从句中缺少“是否”的词。',
        '由从句前的was surprised可以得知后面是个宾语从句，然后根据从句的句意，可以判断这里应该用连接副词how去修饰形容词big，表示“多么的大.',
        '兔子挖了隧道直接通到了那只狗一直躺着的地方。是作to的宾语，where在句中作状语。',
        '考查同位语从句，被修饰的词是fear，恐惧，是因为担心中式英语可能会让外国游客很尴尬而被扼杀的恐惧，因为从句中句子成分完整，所以用that.'
      ],
      "answer|1":['what','that','if','how','where'],
    }
  ]
});
Mock.mock(mistakeCourseUrl,{
  "list|1-5":[
    {
      "gradeCourseName|1":['一年级语文','初一语文','一年级数学','初二化学','四年级英语','高中地理'],
      "gradeCourseId":/\d{20}/,
    }
  ]
});
Mock.mock(reportListUrl,{
  "count|0-20":15,
  "list|5-10": [
    {
      "id":/[a-z\d-]{40}/,
      "content|1":[
        'I couldn’t do anything but stand and stare. Then a man approached me and asked ______ I wanted myngings back.',
        'He was greeted by the city mouse cheerfully. The country mouse was surprised ______ big the house was.',
        'The rabbit dug a tunnel right to ______ the dog had been lying all the time.',
        'However, there are fears ______ Chinglish could be killed off because some people are worried that Chinglish may embarrass foreign visitors.',
        'The rabbit dug a tunnel right to ______ the dog had been lying all the time.'
      ],
      "analysis|1":[
        '由从句前的及物动词imagine可以得知后面是个宾语从句，再根据从句be like缺宾语的特征判断，这里应该填一个连接代词what，表示“像什么样子。',
        '考查宾语从句，作ask的宾语，从句中不缺成分，一个男人靠近我问我是否想要回我的东西。从句中缺少“是否”的词。',
        '由从句前的was surprised可以得知后面是个宾语从句，然后根据从句的句意，可以判断这里应该用连接副词how去修饰形容词big，表示“多么的大.',
        '兔子挖了隧道直接通到了那只狗一直躺着的地方。是作to的宾语，where在句中作状语。',
        '考查同位语从句，被修饰的词是fear，恐惧，是因为担心中式英语可能会让外国游客很尴尬而被扼杀的恐惧，因为从句中句子成分完整，所以用that.'
      ],
      "answer|1":['what','that','if','how','where'],
    }
  ]
});

