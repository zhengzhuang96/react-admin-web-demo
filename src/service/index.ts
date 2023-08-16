/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-21 14:18:20
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 13:54:01
 * @Description:
 */
import request from "../utils/request";

/**
 * 获取菜单列表
 */
export const fetchRoute = async () => request.get('/auth-login/context/route')
