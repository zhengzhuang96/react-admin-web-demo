/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:22:17
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-15 18:42:26
 * @Description:
 */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Popover, Tabs } from 'antd';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { map } from 'lodash';
import RouteList from '../../config/router';
import AsyncComponent from './AsyncComponent';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

const getRoutesContainsSelf = (path: string): any => {
  for (let i = 0; i < RouteList.length; i++) {
    const element = RouteList[i];
    if (path === element?.path) {
      return [element];
    }
  }
};

const NormalContent: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);
  const navigate = useNavigate();
  const route = useLocation();

  const onChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  useEffect(() => {
    if (route.pathname === '/') {
      navigate('/workplace');
      setActiveKey('/workplace');
    } else {
      navigate(route.pathname);
      setActiveKey(route.pathname);
    }
  }, []);

  useEffect(() => {
    navigate(route.pathname);
    setActiveKey(route.pathname);
  }, [route.pathname]);

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...items,
      { label: 'New Tab', children: 'New Tab Pane', key: newActiveKey },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    console.log('targetKey', targetKey);
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
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
      {/* <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div> */}
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type='editable-card'
        onEdit={onEdit}
      >
        {map(RouteList, (pane) => {
          return (
            <Tabs.TabPane
              closable={pane?.path !== '/wel/index'}
              // tab={<Popover {...this.props} pane={pane} index={pane?.path} />}
              tab={pane?.path}
              key={pane?.path}
            >
              <Routes>
                {getRoutesContainsSelf(pane?.path).map(
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
