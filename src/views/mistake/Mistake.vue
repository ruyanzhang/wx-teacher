<template>
  <div class="mistake">
    <div class="tab-wrapper">
      <Tabs :animated="false">
        <TabPane label="学习报告">
          <NoData v-if="mistakeGradeCourse===null || mistakeList===null" text="当前没有错题"></NoData>
          <MistakeList
            v-else
            :mistakeLoading="mistakeLoading"
            :mistakeGradeCourseId="mistakeGradeCourseId"
            :mistakeStatus="mistakeStatus"
            :mistakeTimeType="mistakeTimeType"
            :mistakeGradeCourse="mistakeGradeCourse"
            :mistakeList="mistakeList"
            @searchMistakeList="searchMistakeList"
            @changeSearch="changeSearch"></MistakeList>
        </TabPane>
        <TabPane label="错题集">

        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapMutations} from 'vuex';
  import MistakeList from './MistakeList';
  import ReportList from './ReportList';
  import NoData from '@/components/no-data';
  import moment from 'moment';
  import {Tabs,TabPane} from 'iview';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'mistake',
    components:{MistakeList,NoData},
    data(){
      return {

      }
    },
    computed:{
      ...mapState({
        'mistakeList':(state)=>state.mistake.mistakeList,
        'mistakeLoading':(state)=>state.mistake.mistakeLoading,
        'mistakePage':(state)=>state.mistake.mistakePage,
        'mistakeGradeCourse':(state)=>state.mistake.mistakeGradeCourse,
        'mistakeGradeCourseId':(state)=>state.mistake.mistakeGradeCourseId,
        'mistakeStatus':(state)=>state.mistake.mistakeStatus,
        'mistakeTimeType':(state)=>state.mistake.mistakeTimeType,
        'reportPage':(state)=>state.mistake.reportPage
      })
    },
    methods:{
      ...mapActions(['getReportList','getMistakeList','getMistakeCourse']),
      ...mapMutations(['showLoading','hideLoading']),
      moment:moment,
      reportLoadData(data={}){
        const vm = this;
        vm.showLoading({type:'report'});
        this.getReportList(data).then(function () {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.hideLoading({type:'report'});
        });
      },
      async mistakeLoadData(data={}){
        const vm = this;
        vm.showLoading({type:'mistake'});
        const mistakeCourse = await this.getMistakeCourse();
        if(!mistakeCourse){return false;}
        vm.searchMistakeList(data);
      },
      searchMistakeList(data={}){
        const vm = this;
        this.getMistakeList({
          ...data,
          mistakePage:data.mistakePage ? data.mistakePage : vm.mistakePage+1
        }).then(function () {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.hideLoading({type:'mistake'});
        });
      },
      changeSearch(type,value){
        const data = {};
        data[type] = value;
        this.searchMistakeList({mistakePage:1,type:type,...data});
      }
    },
    created() {
      this.reportLoadData();
      this.mistakeLoadData();
    }
  }
</script>
