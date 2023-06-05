/*
 * @Author: {zhengzhuang}
 * @Date: 2023-06-05 21:39:17
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-06-05 21:39:53
 * @Description:
 */
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("app")!);
// v18 的新方法
root.render(<App />);
