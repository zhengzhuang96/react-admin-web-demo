/*
 * @Author: {zhengzhuang}
 * @Date: 2023-06-05 21:39:42
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-06-05 22:24:36
 * @Description:
 */
import * as React from "react";
import Logo from "@/assets/images/logo.png";

import "./index.less";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      hello 小壮
      <img src={Logo} />
    </div>
  );
};

export default App;
