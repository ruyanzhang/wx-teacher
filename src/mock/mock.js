import Mock from 'mockjs';
import config from '../utils/config';
const {userLogin} = config.api;
Mock.mock(userLogin,{
  'user':/[a-z]{6,20}/,
  'token':/\d{40}/,
});
