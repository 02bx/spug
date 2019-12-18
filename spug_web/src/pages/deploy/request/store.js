import { observable } from "mobx";
import http from 'libs/http';

class Store {
  @observable records = [];
  @observable types = [];
  @observable record = {};
  @observable isFetching = false;
  @observable addVisible = false;
  @observable ext1Visible = false;
  @observable ext2Visible = false;

  @observable f_name;
  @observable f_app_name;

  fetchRecords = () => {
    this.isFetching = true;
    http.get('/api/deploy/request/')
      .then(res => this.records = res)
      .finally(() => this.isFetching = false)
  };

  showForm = (info) => {
    this.record = info;
    if (info['app_extend'] === '1') {
      this.ext1Visible = true
    } else {
      this.ext2Visible = true
    }
  }
}

export default new Store()