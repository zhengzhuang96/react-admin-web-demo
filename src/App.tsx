/*
 * @Author: {zhengzhuang}
 * @Date: 2023-07-20 17:27:10
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-03 15:51:36
 * @Description:
 */
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import "./index.less";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/public" element={<PublicLayout />} />
          <Route path="/" element={<MainLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
