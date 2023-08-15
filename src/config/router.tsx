/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-04 09:37:36
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-15 18:34:40
 * @Description:
 */
const RouteList: any = [
  // Demo
  {
    path: `/wel/index`,
    component: () => import('../pages/dashboard'),
  },
  // Demo
  {
    path: `/system/application`,
    component: () => import('../pages/demo'),
  },
  // Demo2
  {
    path: `/system/user`,
    component: () => import('../pages/demo2'),
  },
];

export default RouteList;
