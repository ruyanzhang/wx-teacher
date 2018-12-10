<template>
  <div class="home">
    <Tabs :animated="false" type="card">
      <TabPane label="学习报告">
        <MistakeList
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
  import {getToken} from "../../utils";
  import moment from 'moment';
  import {Tabs,TabPane} from 'iview';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'mistake',
    components:{MistakeList},
    data(){
      return {

      }
    },
    computed:{
      ...mapState(['mistakeLoading','mistakePage','mistakeList','mistakeGradeCourse','mistakeGradeCourseId','mistakeStatus',
        'mistakeTimeType','reportPage'])
    },
    methods:{
      ...mapActions(['getReportList','getMistakeList']),
      ...mapMutations(['showLoading','hideLoading']),
      moment:moment,
      reportLoadData(){
        const vm = this;
        const token = getToken();
        const reportPage = this.reportPage;
        vm.showLoading({type:'report'});
        this.getReportList({token,reportPage}).then(function () {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.showLoading({type:'report'});
        });
      },
      mistakeLoadData(data){
        const vm = this;
        const token = getToken();
        const mistakePage = this.mistakePage;
        vm.showLoading({type:'mistake'});
        this.getMistakeList({token,mistakePage,...data}).then(function (data) {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.hideLoading({type:'mistake'});
        });
      },
      changeSearch(type,value){
        const data = {};
        data[type] = value;
        this.mistakeLoadData(data);
      }
    },
    created() {
      this.reportLoadData();
      this.mistakeLoadData();
    }
  }
</script>
