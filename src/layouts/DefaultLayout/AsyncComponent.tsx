/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-10 16:38:24
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-10 16:39:29
 * @Description:
 */
import * as React from 'react';

const AsyncComponent = (importFunc: { (): Promise<any> }) => {
  return class extends React.Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importFunc()
        .then((module) => module.default)
        .then((component) => {
          this.setState({ component });
        });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
