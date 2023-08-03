/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 16:14:29
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-03 18:08:39
 * @Description:
 */
import * as React from "react";
import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.less";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Item 1", "g1"),
    getItem("Item 2", "g2"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const { Sider } = Layout;

const NormalNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Sider
        className="ydy-normal-nav"
        breakpoint="lg"
        theme="light"
        collapsible
        trigger={
          <div className="trigger_box">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        }
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};

export default NormalNav;
