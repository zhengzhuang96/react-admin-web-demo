/*
 * @Author: {zhengzhuang}
 * @Date: 2023-06-06 10:22:42
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-06-06 18:08:12
 * @Description:
 */
import React, { FC } from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/locale/zh_CN'

const Foo = () => {
  return (
    <span>111111</span>
  )
}

const Bar = () => {
  return (
    <span>homehomehomehomehomehome</span>
  )
}

const App: FC = () => {
  // const InnerLayout = lazy(() => import(/* webpackChunkName:"inner-layout" */ '@/layouts/InnerLayout'))
  // const OuterLayout = lazy(() => import(/* webpackChunkName:"outer-layout" */ '@/layouts/OuterLayout'))

  return (
    <ConfigProvider locale={zh_CN}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Foo />}></Route>
          <Route path="/home" element={<Bar />}></Route>
        </Routes>
      </HashRouter>
    </ConfigProvider >
  )
}

export default App
