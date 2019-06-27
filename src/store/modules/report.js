import { getNotCheckReport, saveReport, getCheckReport, sendReport } from '@/services/report'

const state = {
  notCheckReport: {},
  checkReport: {},
};

const getters = {
  notCheckReportData(state) {
    return state.notCheckReport || {}
  },
  checkReportData(state) {
    return state.checkReport || {}
  }
};

const mutations = {
  updateState (state, payload) {
    if (payload.type === 'notCheckReport') {
      state.notCheckReport = payload.notCheckReportData
    }else if (payload.type === 'checkReport') {
      state.checkReport = payload.checkReportData
    }
  }
};

const actions = {
  async getNotCheckReport ({ commit }, payload) {
    const data = await getNotCheckReport(payload)
    commit('updateState', {
      type: 'notCheckReport',
      notCheckReportData: data.data
    })
    return Promise.resolve(data)
  },
  async getCheckReport ({ commit }, payload) {
    const data = await getCheckReport(payload)
    commit('updateState', {
      type: 'checkReport',
      checkReportData: data.data
    })
    return Promise.resolve(data)
  },
  async saveReport (store, payload) {
    const data = await saveReport(payload)
    return Promise.resolve(data)
  },
  async sendReport (store, payload) {
    const data = await sendReport(payload);
    return Promise.resolve(data)
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
