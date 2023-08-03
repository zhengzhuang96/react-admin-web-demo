/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 15:51:21
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-03 17:23:17
 * @Description:
 */
import * as React from "react";
import { Layout } from "antd";
import DefaultLayout from "./DefaultLayout";
import NormalNav from "./DefaultLayout/NormalNav";
import "./index.less";
import NormalContent from "./DefaultLayout/NormalContent";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <>
      <Layout className="ydy-normal-container">
        <Header className="header-style">
          <DefaultLayout />
        </Header>
        <Layout hasSider className="ydy-normal-body">
          <Sider className="ydy-normal-nav">
            <NormalNav />
          </Sider>
          <Content className="ydy-normal-content">
            <NormalContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
