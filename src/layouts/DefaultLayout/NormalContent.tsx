/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:22:17
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 15:50:04
 * @Description:
 */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Popover, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { map } from 'lodash';
import RouteList from '../../config/router';
import AsyncComponent from './AsyncComponent';
import { getDefaultMenu, removeOpenMenu } from '../../utils/menuTab';
import { setMenuTabs } from '../../store/model/user';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

function findMatchingPaths(array1: any, array2: any[]) {
  const matchingPaths = [];

  for (const item1 of array1) {
    const matchingItem = array2.find((item2) => item2.path === item1.key);
    if (matchingItem) {
      matchingPaths.push(matchingItem);
    }
  }

  return matchingPaths;
}

const getRoutesContainsSelf = (menuList: any): any => {
  const matchingPaths = findMatchingPaths(menuList, RouteList);
  return matchingPaths;
};

const NormalContent: React.FC = () => {
  // const [menuList, setMenuList] = useState<any>([]);
  const [activeKey, setActiveKey] = useState<string>();
  const [items, setItems] = useState<any>();
  const newTabIndex = useRef(0);
  const navigate = useNavigate();
  const route = useLocation();
  const dispatch = useDispatch();
  const { menuTabs } = useSelector((store: any) => store.user);

  const onChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  useEffect(() => {
    if (route.pathname === '/') {
      navigate('/wel/index');
      setActiveKey('/wel/index');
    } else {
      navigate(route.pathname);
      setActiveKey(route.pathname);
    }

    const _menuInfo = getDefaultMenu();
    // setMenuList(_menuInfo);
    dispatch(setMenuTabs(_menuInfo));
  }, []);

  useEffect(() => {
    navigate(route.pathname);
    setActiveKey(route.pathname);
    if (route.pathname === '/') {
      navigate('/wel/index');
      setActiveKey('/wel/index');
    }
  }, [route.pathname]);

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const _newMenu = removeOpenMenu(targetKey);
    dispatch(setMenuTabs(_newMenu?.tabs));
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type='editable-card'
        onEdit={onEdit}
      >
        {map(menuTabs, (pane) => {
          return (
            <Tabs.TabPane
              closable={pane?.key !== '/wel/index'}
              // tab={<Popover {...this.props} pane={pane} index={pane?.key} />}
              tab={pane?.title}
              key={pane?.key}
            >
              <Routes>
                {menuTabs.length > 0 &&
                  getRoutesContainsSelf(menuTabs).map(
                    (item: any, key: React.Key | null | undefined) => {
                      const AsyncHome = AsyncComponent(item?.component);
                      return (
                        <Route
                          path={item?.path}
                          element={<AsyncHome />}
                          key={key}
                        />
                      );
                    }
                  )}
              </Routes>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default NormalContent;
