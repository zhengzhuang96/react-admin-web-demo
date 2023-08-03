/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:22:17
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-03 17:27:43
 * @Description:
 */
import * as React from "react";
import { useRef, useState } from "react";
import { Button, Tabs } from "antd";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

const NormalContent: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...items,
      { label: "New Tab", children: "New Tab Pane", key: newActiveKey },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
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

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
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
        type="editable-card"
        onEdit={onEdit}
      >
        <Tabs.TabPane
          closable={false}
          // tab={<Popover {...this.props} pane={pane} index={index} />}
          tab="1"
          key="1"
        >
          1
        </Tabs.TabPane>
        <Tabs.TabPane
          // tab={<Popover {...this.props} pane={pane} index={index} />}
          tab="2"
          key="2"
        >
          2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default NormalContent;
