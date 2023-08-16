/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-16 11:24:38
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 14:58:00
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchUserMenu } from '../../actions/user';

export interface UserState {
  /**
   * 获取的菜单列表
   */
  menuList: Array<any>;
  /**
   * 打开的tabs菜单
   */
  menuTabs: Array<any>;
}

const initialState: UserState = {
  menuList: [],
  menuTabs: [],
};

export const userModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMenuTabs: (state, { payload }) => {
      console.log('payload', payload);
      state.menuTabs = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncFetchUserMenu.pending, (state) => {
        // console.log('🚀 ~ 进行中！');
      })
      .addCase(asyncFetchUserMenu.fulfilled, (state, { payload }) => {
        // console.log('🚀 ~ fulfilled', payload);
        state.menuList = payload;
      })
      .addCase(asyncFetchUserMenu.rejected, (state, err) => {
        // console.log('🚀 ~ rejected', err);
      });
  },
});

export const { setMenuTabs } = userModel.actions;

export default userModel.reducer;
