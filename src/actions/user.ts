/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-16 11:27:59
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 14:21:09
 * @Description:
 */
import { fetchRoute } from '../service';
import { createAsyncThunk } from '@reduxjs/toolkit';

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）

/**
 * 获取菜单列表
 * @return {*}
 */
export const asyncFetchUserMenu: any = createAsyncThunk(
  'user/fetchRoute',
  async () => {
    const res = await fetchRoute();

    function setMenuFun(data: any[]) {
      return data.map((item) => {
        const modifiedItem = {
          label: item.name,
          key: item.path,
          ...item,
        };

        if (item.children) {
          modifiedItem.children = setMenuFun(item.children);
        }

        delete modifiedItem.name;
        delete modifiedItem.path;
        delete modifiedItem.parentId;
        delete modifiedItem.applicationIdentifier;
        delete modifiedItem.alwaysShow;
        delete modifiedItem.applicationType;

        return modifiedItem;
      });
    }

    return setMenuFun(res);
  }
);
