import {getDay,getMonth} from '@/services/home';
const state = {
  dayList: {},
  monthList:{}
};

const getters = {
  dayListCount:state=>state.dayList.count || 0,
  dayListData:state=>state.dayList.list || [],
  monthListCount:state=>state.monthList.count || 0,
  monthListData:state=>state.monthList.list || [],
};

const mutations = {
  updateState (state, payload) {
    if(payload.type==='dayList'){
      state.dayList = payload.dayList;
    }else if(payload.type==='monthList'){
      state.monthList = payload.monthList;
    }
  }
};

const actions = {
  async getDayList ({ commit }, payload) {
    const data = await getDay(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState', {
        type:'dayList',
        dayList:data.data
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getMonthList ({ commit }, payload) {
    const data = await getMonth(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit('updateState',{
        type:'monthList',
        monthList:data.data
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
