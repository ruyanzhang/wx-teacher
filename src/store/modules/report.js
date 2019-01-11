import {getNotCheckReport} from '../../services/report';
const state = {
  checkReportLoading:false,
  notCheckReportData: {}
};

const getters = {

};

const mutations = {
  updateState (state, payload) {
    if(payload.type==='notCheckReport'){
      state.notCheckReportData = payload.notCheckReportData
    }
  },
  showNotCheckLoading(state){
    state.checkReportLoading=true;
  },
  hideNotCheckLoading(state){
    state.checkReportLoading=false;
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
};

export default {
  state,
  getters,
  mutations,
  actions
}
