/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-16 09:50:18
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 14:28:07
 * @Description:
 */

/**
 * 通过当前的path获取所对应的菜单值
 * @return {*}
 * @param {any} data
 * @param {any} targetKey
 * @param {*} parentKey
 */
export function findTopmostKey(data: any, targetKey: any, parentKey = null) {
  for (const item of data) {
    if (item.key === targetKey) {
      return item;
    }

    if (item.children) {
      const foundKey: any = findTopmostKey(
        item.children,
        targetKey,
        parentKey || item.key
      );
      if (foundKey) {
        return foundKey;
      }
    }
  }

  return null;
}
