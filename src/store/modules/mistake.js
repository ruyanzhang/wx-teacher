import {getReportList,getMistakeList,getMistakeCourse} from '../../services/mistake';
import {getToken} from "../../utils";
const state = {
  mistakeLoading:false,
  mistakePage:0,
  mistakeList:[],
  mistakeGradeCourseId:'',
  mistakeGradeCourse:[],
  mistakeStatus:'0',
  mistakeTimeType:'1',
  hasMistake:true,
  reportPage:1,
  reportList:[],
  reportLoading:false,
  hasReport:true,
};

const getters = {

};

const mutations = {
  updateState (state, payload) {
    if(payload.type==='mistakeGradeCourseId'){
      state.mistakeGradeCourseId = payload.mistakeGradeCourseId;
      state.mistakePage = payload.mistakePage;
    }else if(payload.type==='mistakeStatus'){
      state.mistakeStatus = payload.mistakeStatus;
      state.mistakePage = payload.mistakePage;
    }else if(payload.type==='mistakeTimeType'){
      state.mistakeTimeType = payload.mistakeTimeType;
      state.mistakePage = payload.mistakePage;
    }else if(payload.type==='mistakeGradeCourse'){
      state.mistakeGradeCourse = payload.mistakeGradeCourse;
      state.mistakeGradeCourseId = payload.mistakeGradeCourse ? payload.mistakeGradeCourse[0].gradeCourseId : '';
    }else if(payload.type==='mistakeList'){
      state.mistakeList = payload.mistakeList;
      state.mistakePage = payload.mistakePage;
      state.hasMistake = payload.hasMistake;
    }else if(payload.type==='reportList'){
      state.reportList = payload.reportList;
      state.reportPage = payload.reportPage;
      state.hasReport = payload.hasReport;
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
        mistakePage:payload.reportPage,
        hasMistake: data.data.list && data.data.list.length > 0,
        mistakeList:payload.reportPage===1 ? data.data.list : state.reportList.concat(data.data.list)
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
    commit('updateState',{...payload});
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'mistakeList',
        mistakePage:payload.mistakePage,
        hasMistake: data.data.list && data.data.list.length > 0,
        mistakeList:payload.mistakePage===1 ? data.data.list : state.mistakeList.concat(data.data.list)
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
