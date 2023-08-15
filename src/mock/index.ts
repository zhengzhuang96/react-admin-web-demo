/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-11 15:33:06
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-11 15:49:10
 * @Description:
 */
var Mock = require('mockjs');

import user from './modules/user';

// 延时数据返回,模拟loading效果
Mock.setup({
  timeout: '300-800',
});


Mock.mock(/\/api\/auth-login\/context\/route/, 'get', user.getList);
