/*
 * @Author: {zhengzhuang}
 * @Date: 2023-07-20 17:27:10
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 13:33:39
 * @Description:
 */
import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';
import store from "./store";
import './index.less';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route path='/public' element={<PublicLayout />} />
              <Route path='*' element={<MainLayout />}></Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </>
  );
};

export default App;
