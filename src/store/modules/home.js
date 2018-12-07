import {getDay,getMonth} from '@/services/home';
const state = {
  dayList: [],
  monthList:[]
};

const getters = {
  dayListCount:state=>state.dayList.count,
  dayListData:state=>state.dayList.list,
  monthListCount:state=>state.monthList.count,
  monthListData:state=>state.monthList.list,
};

const mutations = {
  updateState (state, payload) {
    state = {...state,...payload};
  }
};

const actions = {
  async getDayList ({ commit }, payload) {
    const data = await getDay(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit({
        type: 'updateState',
        payload:{dayList:data.data}
      });
      return Promise.resolve(data.data);
    }else{
      return Promise.resolve(data.msg);
    }
  },
  async getMonthList ({ commit }, payload) {
    const data = await getMonth(payload);
    if(data.status===200 && data.statusText==='OK'){
      commit({
        type: 'updateState',
        payload:{monthList:data.data}
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
