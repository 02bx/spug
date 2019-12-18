import React from 'react';
import { observer } from 'mobx-react';
import { Card, Input, Button } from 'antd';
import { SearchForm } from 'components';
import SelectApp from './SelectApp';
import Ext1Form from './Ext1Form';
import Ext2Form from './Ext2Form';
import ComTable from './Table';
import store from './store';

export default observer(function () {
  return (
    <Card>
      <SearchForm>
        <SearchForm.Item span={8} title="应用名称">
          <Input allowClear onChange={e => store.f_app_name = e.target.value} placeholder="请输入"/>
        </SearchForm.Item>
        <SearchForm.Item span={8} title="申请标题">
          <Input allowClear onChange={e => store.f_name = e.target.value} placeholder="请输入"/>
        </SearchForm.Item>
        <SearchForm.Item span={8}>
          <Button type="primary" icon="sync" onClick={store.fetchRecords}>刷新</Button>
        </SearchForm.Item>
      </SearchForm>
      <div style={{marginBottom: 16}}>
        <Button type="primary" icon="plus" onClick={() => store.addVisible = true}>新建发布申请</Button>
      </div>
      <ComTable/>
      {store.addVisible && <SelectApp />}
      {store.ext1Visible && <Ext1Form />}
      {store.ext2Visible && <Ext2Form />}
    </Card>
  )
})