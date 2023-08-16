/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-16 09:51:13
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 15:26:41
 * @Description:
 */
import { findTopmostKey } from '.';

// 工作台 tab
const workplaceTab = {
  // title: 'ydtms.common.title.workspace', // todo 可不可以使用编码, openTab 时 使用 title: intl.get(title).d(title),
  title: '控制台', // todo 可不可以使用编码, openTab 时 使用 title: intl.get(title).d(title),
  icon: 'home',
  closable: false,
  key: '/wel/index',
  path: '/wel/index',
};

/**
 * 设置默认菜单
 */
export function setDefaultMenu() {
  if (!sessionStorage.getItem('menuTabSessionKey')) {
    const _menuInfo = {
      activeTabKey: '/wel/index',
      tabs: [workplaceTab],
    };
    sessionStorage.setItem('menuTabSessionKey', JSON.stringify(_menuInfo));
  }
}

/**
 * 获取本地存储的菜单
 */
export function getDefaultMenu() {
  const _menuInfo = sessionStorage.getItem('menuTabSessionKey') ?? '';
  const _newMenu = JSON.parse(_menuInfo);
  return _newMenu?.tabs;
}

/**
 * 设置新增的菜单
 */
export function setAddMenu(menu: string, menuList: any[]) {
  const _menuInfo = sessionStorage.getItem('menuTabSessionKey') ?? '';
  const _newMenu = JSON.parse(_menuInfo);
  // console.log('RouteList', RouteList);

  const _addMenu = _newMenu?.tabs.find((item: any) => item?.path === menu);
  if (!_addMenu) {
    const _info = findTopmostKey(menuList, menu);
    _newMenu.tabs.push({
      title: _info?.label,
      icon: '',
      closable: false,
      key: _info?.key,
      path: _info?.key,
    });
    sessionStorage.setItem('menuTabSessionKey', JSON.stringify(_newMenu));
    return _newMenu;
  }
}

/**
 * 关闭打开的菜单
 */
export function removeOpenMenu(key: any) {
  const _menuInfo = sessionStorage.getItem('menuTabSessionKey') ?? '';
  const _newMenu = JSON.parse(_menuInfo);

  let lastIndex;
  _newMenu?.tabs.forEach((pane: { key: any; }, i: number) => {
    if (pane.key === key) {
      lastIndex = i - 1;
    }
  });
  const panes = _newMenu?.tabs.filter((pane: { key: any; }) => pane.key !== key);
  sessionStorage.setItem('menuTabSessionKey', JSON.stringify({
    activeTabKey: '/wel/index',
    tabs: panes
  }));
  return {
    activeTabKey: '/wel/index',
    tabs: panes
  }
}
