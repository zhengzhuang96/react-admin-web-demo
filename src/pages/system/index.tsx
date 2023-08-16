/*
 * @Author: {zhengzhuang}
 * @Date: 2023-08-16 15:55:21
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-16 16:00:44
 * @Description:
 */
import * as React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.less'

interface DataType {
  key?: string;
  name?: string;
  age?: number;
  address?: string;
  tags?: string[];
}

const Index: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '页面名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '最近修改人',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (_) => (
        <Space size='middle'>
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      name: 'demo',
      address: 'New York No. 1 Lake Park',
    },
  ];

  return (
    <>
      <div className='box'>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default Index;
