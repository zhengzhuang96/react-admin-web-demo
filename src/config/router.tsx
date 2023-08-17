/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-04 09:37:36
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-17 16:29:39
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
    component: () => import('../pages/system'),
  },
  // Demo2
  {
    path: `/lowcode/edit`,
    component: () => import('../pages/lowcode'),
  },
];

export default RouteList;
