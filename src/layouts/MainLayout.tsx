/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-03 15:51:21
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 13:47:18
 * @Description:
 */
import * as React from 'react';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchUserMenu } from '../actions/user';
import DefaultLayout from './DefaultLayout';
import NormalNav from './DefaultLayout/NormalNav';
import NormalContent from './DefaultLayout/NormalContent';
import { setDefaultMenu } from '../utils/menuTab';
import './index.less';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchUserMenu());
    setDefaultMenu();
  }, []);

  return (
    <>
      <Layout className='ydy-normal-container'>
        <Header className='header-style'>
          <DefaultLayout />
        </Header>
        <Layout hasSider className='ydy-normal-body'>
          <NormalNav />
          <Content className='ydy-normal-content'>
            <NormalContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
