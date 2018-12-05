import Mock from 'mockjs';
import config from '../utils/config';
const {userLogin} = config.api;
Mock.mock(userLogin,{
  'name|3':'fei',
  'age|20-30':25,
});
