<template>
  <div class="mistake">
    <div class="tab-wrapper bg1">
      <Tabs :animated="false" value="report" @on-click="changeTab">
        <TabPane label="学习报告" name="report">
          <NoData v-if="reportList===null" text="当前没有学习报告"></NoData>
          <ReportList
            v-else
            :hasReport="hasReport"
            :reportLoading="$wait.waiting('searchReportList')"
            :reportList="reportList"
            @searchReportList="searchReportList">
          </ReportList>
        </TabPane>
        <TabPane label="错题集" name="mistake">
          <NoData v-if="mistakeGradeCourse===null || mistakeList===null" text="当前没有错题"></NoData>
          <MistakeList
            v-else
            :curTab="curTab"
            :hasMistake="hasMistake"
            :mistakeLoading="$wait.waiting('searchMistakeList')"
            :mistakeGradeCourseId="mistakeGradeCourseId"
            :mistakeStatus="mistakeStatus"
            :mistakeTimeType="mistakeTimeType"
            :mistakeGradeCourse="mistakeGradeCourse"
            :mistakeList="mistakeList"
            @searchMistakeList="searchMistakeList"
            @changeSearch="changeSearch"></MistakeList>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapActions,mapState} from 'vuex';
  import MistakeList from './MistakeList';
  import ReportList from './ReportList';
  import NoData from '@/components/no-data';
  import moment from 'moment';
  import {Tabs,TabPane} from 'iview';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'mistake',
    components:{MistakeList,ReportList,NoData},
    data(){
      return {
        curTab:"report"
      }
    },
    computed:{
      ...mapState({
        'hasMistake':(state)=>state.mistake.hasMistake,
        'mistakeList':(state)=>state.mistake.mistakeList,
        'mistakeLoading':(state)=>state.mistake.mistakeLoading,
        'mistakePage':(state)=>state.mistake.mistakePage,
        'mistakeGradeCourse':(state)=>state.mistake.mistakeGradeCourse,
        'mistakeGradeCourseId':(state)=>state.mistake.mistakeGradeCourseId,
        'mistakeStatus':(state)=>state.mistake.mistakeStatus,
        'mistakeTimeType':(state)=>state.mistake.mistakeTimeType,
        'reportPage':(state)=>state.mistake.reportPage,
        'reportLoading':(state)=>state.mistake.reportLoading,
        'reportList':(state)=>state.mistake.reportList,
        'hasReport':(state)=>state.mistake.hasReport,
      })
    },
    methods:{
      ...mapActions(['getReportList','getMistakeList','getMistakeCourse']),
      moment:moment,
      reportLoadData(data={}){
        const vm = this;
        vm.searchReportList(data);
      },
      async mistakeLoadData(data={}){
        const vm = this;
        const mistakeCourse = await this.getMistakeCourse();
        if(!mistakeCourse){return false;}
        vm.searchMistakeList(data);
      },
      searchReportList(data={}){
        const vm = this;
        if(vm.$wait.waiting('searchReportList')){return false;}
        vm.$wait.start("searchReportList");
        this.getReportList({
          ...data,
          reportPage:data.reportPage ? data.reportPage : vm.reportPage+1
        }).then(()=>{},(data)=>{
          vm.$Message.error(data);
        }).finally(()=>{
          vm.$wait.end("searchReportList");
        });
      },
      searchMistakeList(data={}){
        const vm = this;
        if(vm.$wait.waiting("searchMistakeList")){return false;}
        vm.$wait.start("searchMistakeList");
        this.getMistakeList({
          ...data,
          mistakePage:data.mistakePage ? data.mistakePage : vm.mistakePage+1
        }).then(()=>{},(data)=>{
          vm.$Message.error(data);
        }).finally(()=>{
          vm.$wait.end("searchMistakeList");
        });
      },
      changeSearch(type,value){
        const data = {};
        data[type] = value;
        this.searchMistakeList({mistakePage:1,type:type,...data});
      },
      changeTab(name){
        this.curTab = name;
      }
    },
    created() {
      this.reportLoadData();
      this.mistakeLoadData();
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
