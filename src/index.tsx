/*
 * @Author: {zhengzhuang}
 * @Date: 2023-07-20 17:26:51
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-07-20 17:27:03
 * @Description:
 */
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("app")!);
// v18 的新方法
root.render(<App />);
