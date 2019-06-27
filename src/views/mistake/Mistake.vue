<template>
  <div class="mistake">
    <div class="tab-wrapper bg1">
      <Tabs :animated="false" value="report" @on-click="changeTab">
        <TabPane label="学习报告" name="report">
          <ReportList></ReportList>
        </TabPane>
        <TabPane label="错题集" name="mistake">
          <MistakeList :curTab="curTab"></MistakeList>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import MistakeList from './MistakeList'
import ReportList from './ReportList'
import { Tabs, TabPane } from 'iview'
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
export default {
  name: 'mistake',
  components: { MistakeList, ReportList },
  data(){
    return {
      curTab:"report"
    }
  },
  computed: {
  },
  methods: {
    changeTab(name) {
      this.curTab = name;
    }
  },
  created() {
  }
}
</script>
<style lang="less">
  .mistake{
    .ivu-tabs-nav{
      width: 100%;
    }
    .ivu-tabs-tab{
      width: 50%;
      margin-right: 0;
      text-align: center;
    }
  }

</style>
