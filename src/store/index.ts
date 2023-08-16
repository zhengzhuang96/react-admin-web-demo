/*
 * @Author: {zhengzhuang}
 * @Date: 2023-02-13 10:49:41
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 14:06:03
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit';
import userModel from './model/user';

const store = configureStore({
  reducer: {
    user: userModel,
  },
});

export default store;
