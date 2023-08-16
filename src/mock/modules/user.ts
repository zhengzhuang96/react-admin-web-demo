/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 17:03:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-11 15:47:01
 * @Description:
 */
const getList = (config: any) => {
  return {
    code: 0,
    data: [
      {
        id: '834002593268115937',
        parentId: '0',
        path: '/wel/index',
        name: '首页',
        component: '/wel/index',
        meta: {
          title: '首页',
          icon: 'el-icon-house',
          breadcrumb: true,
        },
        hidden: false,
        alwaysShow: false,
        applicationType: 0,
        domain: '',
        applicationIdentifier: '',
        describe: '首页菜单备',
      },
      {
        id: '1094919715546988577',
        parentId: '0',
        path: '/application',
        name: '应用中心',
        component: 'Layout',
        meta: {
          title: '应用中心',
          icon: 'ydyicon ydyicon-appstoreadd',
          breadcrumb: true,
        },
        hidden: false,
        alwaysShow: true,
        applicationType: 0,
        domain: '',
        applicationIdentifier: '',
        describe: '',
        children: [
          {
            id: '1069296576641369121',
            parentId: '1094919715546988577',
            path: '/system/application',
            name: '应用管理',
            component: '/system/application/index',
            meta: {
              title: '应用管理',
              icon: 'el-icon-monitor',
              breadcrumb: true,
            },
            hidden: false,
            alwaysShow: false,
            applicationType: 0,
            domain: '',
            applicationIdentifier: '',
            describe: '',
          },
        ],
      },
      {
        id: '1094920299297636417',
        parentId: '0',
        path: '/user',
        name: '用户中心',
        component: 'Layout',
        meta: {
          title: '用户中心',
          icon: 'ydyicon ydyicon-user',
          breadcrumb: true,
        },
        hidden: false,
        alwaysShow: true,
        applicationType: 0,
        domain: '',
        applicationIdentifier: '',
        describe: '',
        children: [
          {
            id: '101',
            parentId: '1094920299297636417',
            path: '/system/user',
            name: '用户管理',
            component: '/system/user/index',
            meta: {
              title: '用户管理',
              icon: 'el-icon-user-solid',
              breadcrumb: true,
            },
            hidden: false,
            alwaysShow: false,
            applicationType: 0,
            domain: '',
            applicationIdentifier: '',
            describe: '系统管理',
          },
          {
            id: '1019630519379296353',
            parentId: '1094920299297636417',
            path: '/system/project',
            name: '项目组管理',
            component: '/system/project/index',
            meta: {
              title: '项目组管理',
              icon: 'el-icon-notebook-2',
              breadcrumb: true,
            },
            hidden: false,
            alwaysShow: false,
            applicationType: 0,
            domain: '',
            applicationIdentifier: '',
            describe: '',
          },
          {
            id: '603982542332235201',
            parentId: '1094920299297636417',
            path: '/system/dept',
            name: '组织管理',
            component: '/system/dept/index',
            meta: {
              title: '组织管理',
              icon: 'el-icon-s-flag',
              breadcrumb: true,
            },
            hidden: false,
            alwaysShow: false,
            applicationType: 0,
            domain: '',
            applicationIdentifier: '',
            describe: '',
          },
          {
            id: '603982713849908801',
            parentId: '1094920299297636417',
            path: '/system/post',
            name: '岗位管理',
            component: '/system/post/index',
            meta: {
              title: '岗位管理',
              icon: 'el-icon-takeaway-box',
              breadcrumb: true,
            },
            hidden: false,
            alwaysShow: false,
            applicationType: 0,
            domain: '',
            applicationIdentifier: '',
            describe: '',
          },
        ],
      },
    ],
    extra: {
      traceId: '7f03ffea6077c39c',
    },
    isError: false,
    isSuccess: true,
    msg: 'ok',
    msgCode: '',
    timestamp: 1691739659548,
  };
};


export default {
  getList,
};
