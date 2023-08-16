/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:14:29
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 15:26:59
 * @Description:
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { setMenuTabs } from '../../store/model/user';
import { setAddMenu } from '../../utils/menuTab';
import './index.less';

const { Sider } = Layout;

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

const NormalNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [activeMenus, setActiveMenus] = useState<string[]>([]);
  const navigate = useNavigate();
  const route = useLocation();
  const dispatch = useDispatch();
  const { menuList } = useSelector((store: any) => store.user);

  useEffect(() => {
    setActiveMenus([route.pathname]);
  }, [route.pathname]);

  useEffect(() => {
    if (menuList) {
      const _info = findTopmostKey(menuList, route.pathname);
      _info && setOpenKeys([_info]);
    }
  }, [menuList, route.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    const _addState = setAddMenu(e?.key, menuList);
    _addState && dispatch(setMenuTabs(_addState?.tabs));
    setActiveMenus([e?.key]);
    navigate(e?.key);
  };

  const onOpenChange = (keys: any) => {
    const levelOneMenu = menuList.map((item: { key: any }) => item.key);
    const latestOpenKey: any = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (levelOneMenu.find((item: any) => item === latestOpenKey)) {
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
          items={menuList}
        />
      </Sider>
    </>
  );
};

export default NormalNav;
