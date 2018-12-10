import {getReportList,getMistakeList} from '../../services/mistake';
const state = {
  mistakeLoading:false,
  mistakePage:1,
  mistakeList:[],
  mistakeGradeCourseId:'',
  mistakeGradeCourse:[],
  mistakeStatus:0,
  mistakeTimeType:1,
  reportPage:1,
  reportList:[],
  reportLoading:false
};

const getters = {

};

const mutations = {
  updateState (state, payload) {

  },
  showLoading(state,payload){
    if(payload.type==='mistake'){
      state.mistakeLoading=true;
    }else if(payload.type==='report'){
      state.reportLoading=true;
    }
  },
  hideLoading(state,payload){
    if(payload.type==='mistake'){
      state.mistakeLoading=false;
    }else if(payload.type==='report'){
      state.reportLoading=false;
    }
  }
};

const actions = {
  async getReportList ({ commit }, payload) {
    const data = await getReportList(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit({
        type: 'updateState',
        payload:data.data
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getMistakeList ({ commit }, payload) {
    const {mistakeGradeCourseId,mistakePage,mistakeStatus,mistakeTimeType} = state;
    const data = await getMistakeList({mistakeGradeCourseId,mistakePage,mistakeStatus,mistakeTimeType,...payload});
    if(data.status===200 && data.statusText==='OK'){
      commit({
        type: 'updateState',
        payload:data.data
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
