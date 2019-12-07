import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Input, Button, Select, Icon } from 'antd';
import envStore from '../environment/store';
import styles from './index.module.css';
import { SearchForm } from 'components';
import TableView from './TableView';
import TextView from './TextView';
import JSONView from './JSONView';
import Record from './Record';
import store from './store';

@observer
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '1'
    }
  }

  componentDidMount() {
    const {type, id} = this.props.match.params;
    store.type = type;
    store.id = id;
    if (envStore.records.length === 0) {
      envStore.fetchRecords().then(() => this.updateEnv())
    } else {
      this.updateEnv()
    }
  }

  updateEnv = (env) => {
    store.env = env || envStore.records[0];
    store.fetchRecords()
  };

  render() {
    const {view} = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Menu
            mode="inline"
            selectedKeys={[String(store.env.id)]}
            style={{border: 'none'}}
            onSelect={({item}) => this.updateEnv(item.props.env)}>
            {envStore.records.map(item => (
              <Menu.Item key={item.id} env={item}>{item.name} ({item.key})</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.right}>
          <SearchForm>
            <SearchForm.Item span={5} title="视图">
              <Select value={view} style={{width: '100%'}} onChange={v => this.setState({view: v})}>
                <Select.Option value="1"><Icon type="table" style={{marginRight: 10}} />表格</Select.Option>
                <Select.Option value="2"><Icon type="unordered-list" style={{marginRight: 10}} />文本</Select.Option>
                <Select.Option value="3"><Icon type="number" style={{marginRight: 10}} />JSON</Select.Option>
              </Select>
            </SearchForm.Item>
            <SearchForm.Item span={7} title="Key">
              <Input allowClear onChange={e => store.f_name = e.target.value} placeholder="请输入"/>
            </SearchForm.Item>
            <SearchForm.Item span={4}>
              <Button type="primary" icon="sync" onClick={store.fetchRecords}>刷新</Button>
            </SearchForm.Item>
            <SearchForm.Item span={4}>
              <Button type="primary" style={{backgroundColor: 'orange', borderColor: 'orange'}} icon="history"
                      onClick={store.showRecord}>更改历史</Button>
            </SearchForm.Item>
            <SearchForm.Item span={4} style={{textAlign: 'right'}}>
              <Button type="primary" icon="plus" onClick={() => store.showForm()}>新增配置</Button>
            </SearchForm.Item>
          </SearchForm>

          {view === '1' && <TableView />}
          {view === '2' && <TextView />}
          {view === '3' && <JSONView />}
        </div>
        {store.recordVisible && <Record />}
      </div>
    )
  }
}

export default Index