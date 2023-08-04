/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-04 09:37:36
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-04 09:40:02
 * @Description:
 */

const Route = [
  // Demo
  {
    path: `/fee/demo`,
    component: () => import("../pages/demo"),
  },
  // Demo2
  {
    path: `/fee/demo2`,
    component: () => import("../pages/demo2"),
  },
];

export default Route;
