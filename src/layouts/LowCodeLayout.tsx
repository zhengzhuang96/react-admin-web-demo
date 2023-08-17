/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-17 16:34:09
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-17 16:35:32
 * @Description:
 */
import * as React from 'react';
import { Route, Routes } from 'react-router';
import LowCode from '../pages/lowcode';

const LowCodeLayout: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/lowcode/edit' element={<LowCode />} />
      </Routes>
    </>
  );
};

export default LowCodeLayout;
