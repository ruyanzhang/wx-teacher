<template>
  <div class="mistake" style="padding: 10px;">
    <Tabs :animated="false" type="card">
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
          @mistakeLoadData="mistakeLoadData"
          @changeSearch="changeSearch"></MistakeList>
      </TabPane>
      <TabPane label="错题集">

      </TabPane>
    </Tabs>
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
      ...mapMutations(['showLoading','hideLoading','updateState']),
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
        this.getMistakeList(data).then(function (data) {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.hideLoading({type:'mistake'});
        });
      },
      changeSearch(type,value){
        const data = {};
        data[type] = value;
        this.updateState({
          type:type,
          ...data
        });
        this.mistakeLoadData();
      }
    },
    created() {
      this.reportLoadData();
      this.mistakeLoadData();
    }
  }
</script>
