import React from 'react';
import { observer } from 'mobx-react';
import { Card, Input, Select, Button } from 'antd';
import { SearchForm } from 'components';
import ComTable from './Table';
import store from './store';

export default observer(function () {
  return (
    <Card>
      <SearchForm>
        <SearchForm.Item span={8} title="任务类型">
          <Select allowClear onChange={v => store.f_type = v} placeholder="请选择">
            {store.types.map(item => (
              <Select.Option value={item} key={item}>{item}</Select.Option>
            ))}
          </Select>
        </SearchForm.Item>
        <SearchForm.Item span={8} title="任务名称">
          <Input allowClear onChange={e => store.f_name = e.target.value} placeholder="请输入"/>
        </SearchForm.Item>
        <SearchForm.Item span={8}>
          <Button type="primary" icon="sync" onClick={store.fetchRecords}>刷新</Button>
        </SearchForm.Item>
      </SearchForm>
      <div style={{marginBottom: 16}}>
        <Button type="primary" icon="plus" onClick={() => store.showForm()}>新建</Button>
      </div>
      <ComTable/>
    </Card>
  )
})