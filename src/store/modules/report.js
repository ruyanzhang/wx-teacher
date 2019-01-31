import {getNotCheckReport,saveReport,getCheckReport,sendReport} from '../../services/report';
const state = {
  notCheckReportData: {},
  checkReportData:{},
};

const getters = {

};

const mutations = {
  updateState (state, payload) {
    if(payload.type==='notCheckReport'){
      state.notCheckReportData = payload.notCheckReportData
    }else if(payload.type==='checkReport'){
      state.checkReportData = payload.checkReportData
    }
  }
};

const actions = {
  async getNotCheckReport ({ commit }, payload) {
    const data = await getNotCheckReport(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'notCheckReport',
        notCheckReportData:data.data
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getCheckReport ({ commit }, payload) {
    const data = await getCheckReport(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'checkReport',
        checkReportData:data.data
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async saveReport (store, payload) {
    const data = await saveReport(payload);
    if(data.status===200 && data.statusText==='OK'){
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async sendReport (store, payload) {
    const data = await sendReport(payload);
    if(data.status===200 && data.statusText==='OK'){
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
