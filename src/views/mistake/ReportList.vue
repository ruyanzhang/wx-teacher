<template>
  <div class="list-wrap">
    <p style="display: none;">{{curTab}}</p>
    <NoData v-if="reportListData===null" text="当前没有学习报告"></NoData>
    <div v-else class="flex1 ovh pb10">
      <scroll class="scroll-wrapper"
              :data="reportListData"
              :pullup="true"
              @scrollToEnd="scrollToEnd">
        <div class="scroll-wrapper-content">
          <ul>
            <li v-for="(item,index) in reportListData" :key="index" @click="()=>goTo(item.id,item.hasCheck)" class="list-item">
              <p class="list-name">{{item.classCourseName}}</p>
              <div class="flex flex-ac flex-jsb">
                <div>
                  <p>{{item.studentName}}</p>
                  <p class="list-time">{{item.lessonTime}}</p>
                </div>
                <div class="list-date">
                  <p>{{item.submitDate.substring(0,10)}}</p>
                  <p>{{item.submitDate.substring(11)}} 提交</p>
                </div>
              </div>
              <div class="list-comment" v-if="item.hasCheck">
                <div class="list-comment-head"></div>
                <div class="flex1">
                  <div style="margin-top: -8px;"><Rate disabled :value="item.score" /></div>
                  <p>老师评价：{{item.evaluation}}</p>
                </div>
              </div>
            </li>
          </ul>
          <Loading class="mt10" v-if="$wait.waiting('getReportList')"></Loading>
          <div v-else-if="hasReportData===false">暂无更多数据！</div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
import NoData from '@/components/no-data'
import moment from 'moment'
import {Rate} from 'iview'
Vue.component('Rate', Rate)
export default {
  name: 'reportList',
  components: { Scroll, Loading, NoData },
  data(){
    return {
      reportPage: 0
    }
  },
  props: ['curTab'],
  computed:{
    ...mapGetters(['reportListData', 'hasReportData'])
  },
  methods:{
    ...mapActions(['getReportList']),
    goTo(id, checked) {
      this.$router.push({
        name: checked ? 'report' : 'check',
        query: {
          id: id
        }
      })
    },
    moment: moment,
    scrollToEnd() {
      this.getReportListData()
    },
    getReportListData() {
      if (this.$wait.waiting('getReportList')) {
        return false
      }
      this.$wait.start('getReportList')
      this.getReportList({
        reportPage: ++this.reportPage
      }).finally(() => {
        this.$wait.end('getReportList')
      })
    }
  },
  created() {
    this.getReportListData()
  }
}
</script>
<style scoped>

</style>
