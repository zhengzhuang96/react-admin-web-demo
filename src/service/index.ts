/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-21 14:18:20
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-11 15:47:58
 * @Description:
 */
import request from "../utils/request";

/**
 * @description: 获取菜单列表
 */
export const fetchRoute = async () => request.get('/auth-login/context/route')
