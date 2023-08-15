/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:14:29
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-15 18:34:11
 * @Description:
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { fetchRoute } from '../../service/index';
import './index.less';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const { Sider } = Layout;

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

function findTopmostKey(data: any, targetKey: any, parentKey = null) {
  for (const item of data) {
    if (item.key === targetKey) {
      return parentKey || item.key;
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

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem(
      'Item 1',
      'g1',
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group'
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group'
    ),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group'
  ),
];

const NormalNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [activeMenus, setActiveMenus] = useState<string[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const navigate = useNavigate();
  const route = useLocation();

  const getRoute = async () => {
    const info = await fetchRoute();

    const _newInfo = setMenuFun(info ?? []);
    console.log('_newInfo', _newInfo);

    setMenu(_newInfo);
  };

  useEffect(() => {
    getRoute();
  }, []);

  useEffect(() => {
    console.log('route.pathname', route.pathname);
    setActiveMenus([route.pathname]);
  }, [route.pathname]);

  useEffect(() => {
    if (menu) {
      const _info = findTopmostKey(menu, route.pathname);
      _info && setOpenKeys([_info]);
    }
  }, [menu, route.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    setActiveMenus([e?.key]);
    navigate(e?.key);
  };

  // 递归渲染子菜单
  const renderSubMenu = (
    data: any[],
    openKeys: string | any[],
    selectedKeys: never[]
  ) => {
    return data.map((item) => {
      const _label = item.name;
      if (item.children) {
        const isOpen = openKeys.includes(item.name);
        return (
          <Menu.SubMenu
            key={item.path}
            title={_label}
            popupClassName={isOpen ? 'ant-menu-submenu-open' : ''}
          >
            {renderSubMenu(item.children, openKeys, selectedKeys)}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={item.path}>{_label}</Menu.Item>;
    });
  };

  const onOpenChange = (keys: any) => {
    const levelOneMenu = menu.map((item) => item.key);
    const latestOpenKey: any = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (levelOneMenu.find((item) => item === latestOpenKey)) {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    } else {
      setOpenKeys(keys);
    }
  };

  return (
    <>
      <Sider
        className='ydy-normal-nav'
        breakpoint='lg'
        theme='light'
        collapsible
        trigger={
          <div className='trigger_box'>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        }
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu
          onClick={onClick}
          onOpenChange={onOpenChange}
          selectedKeys={activeMenus}
          openKeys={openKeys}
          defaultOpenKeys={openKeys}
          mode='inline'
          items={menu}
        />
      </Sider>
    </>
  );
};

export default NormalNav;
