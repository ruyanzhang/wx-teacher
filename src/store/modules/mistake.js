import {getReportList,getMistakeList,getMistakeCourse} from '../../services/mistake';
import {getToken} from "../../utils";
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
    if(payload.type==='mistakeGradeCourseId'){
      state.mistakeGradeCourseId = payload.mistakeGradeCourseId;
    }else if(payload.type==='mistakeStatus'){
      state.mistakeStatus = payload.mistakeStatus;
    }else if(payload.type==='mistakeTimeType'){
      state.mistakeTimeType = payload.mistakeTimeType;
    }else if(payload.type==='mistakeGradeCourse'){
      state.mistakeGradeCourse = payload.mistakeGradeCourse;
      state.mistakeGradeCourseId = payload.mistakeGradeCourse ? payload.mistakeGradeCourse[0].gradeCourseId : '';
    }else if(payload.type==='mistakeList'){
      state.mistakeList = payload.mistakeList;
    }else if(payload.type==='reportList'){
      state.reportList = payload.reportList;
    }
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
  async getReportList ({ state,commit }, payload) {
    const data = await getReportList(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'reportList',
        reportList:data.data.list
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getMistakeList ({ state,commit }, payload={}) {
    const token = getToken();
    const {mistakeGradeCourseId,mistakePage,mistakeStatus,mistakeTimeType} = state;
    const data = await getMistakeList({mistakeGradeCourseId,mistakePage,mistakeStatus,mistakeTimeType,token,...payload});
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'mistakeList',
        mistakeList:data.data.list
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getMistakeCourse({commit}, payload={}) {
    const token = getToken();
    const data = await getMistakeCourse({token,...payload});
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'mistakeGradeCourse',
        mistakeGradeCourse:data.data.list
      });
      return Promise.resolve(data.data.list);
    }else{
      return Promise.resolve(data.msg);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
