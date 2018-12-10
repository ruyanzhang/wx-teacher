<template>
  <div class="home">
    <Tabs :animated="false" type="card">
      <TabPane label="学习报告">
        <Loading v-if="reportLoading"></Loading>
        <div v-else>
          <scroll class="wrapper"
                :data="reportList"
                pulldown="pulldown"
                @pulldown="reportLoadData" style="height: 300px;">
          <ul class="content">
            <li v-for="(item,index) in reportList" :key="index">{{item}}</li>
          </ul>
          <div class="loading-wrapper">加载中...</div>
        </scroll>
        </div>
      </TabPane>
      <TabPane label="错题集">
        <Loading v-if="mistakeLoading"></Loading>
        <div v-else>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapGetters} from 'vuex';
  import Scroll from '@/components/scroll';
  import Loading from '@/components/loading';
  import {getToken} from "../../utils";
  import moment from 'moment';
  import {Tabs,TabPane} from 'iview';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'mistake',
    components:{Scroll,Loading},
    data(){
      return {
        reportLoading:false,
        mistakeLoading:false
      }
    },
    computed:{
      ...mapState(['mistakePage','mistakeList','reportPage','reportList'])
    },
    methods:{
      ...mapActions(['getReportList','getMistakeList']),
      moment:moment,
      reportLoadData(){
        const vm = this;
        const token = getToken();
        const mistakePage = this.mistakePage;
        vm.reportLoading = true;
        this.getReportList({token,mistakePage}).then(function () {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.reportLoading = false;
        });
      },
      mistakeLoadData(){
        const vm = this;
        const token = getToken();
        const reportPage = this.reportPage;
        vm.mistakeLoading = true;
        this.getMistakeList({token,reportPage}).then(function (data) {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.mistakeLoading = false;
        });
      }
    },
    created() {
      this.reportLoadData();
      this.mistakeLoadData();
    }
  }
</script>
