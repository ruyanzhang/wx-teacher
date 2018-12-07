<template>
  <div class="home">
    <div class="calendar-wrap">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"></Calendar>
    </div>
    <Tabs>
      <TabPane label="macOS" icon="logo-apple">
        <!--<scroll class="wrapper"
                :data="dayList"
                pulldown="pulldown"
                @pulldown="loadData">
          <ul class="content">
            <li v-for="(item,index) in dayList" :key="index">{{item}}</li>
          </ul>
          <div class="loading-wrapper"></div>
        </scroll>-->
        <ul>
          <li v-for="(item,index) in dayListData" :key="index" style="border-bottom: 1px solid #dddddd;">
            <div>
              <p>{{item.classCourseName}}</p>
              <p>{{moment(item.timeFrom).format('HH:mm')}}~{{moment(item.timeTo).format('HH:mm')}}</p>
            </div>
            <div>
              <span v-if="item.classroomStatus===0">待备课</span>
              <span v-else-if="item.classroomStatus===1">已备课</span>
              <span v-else-if="item.classroomStatus===2">待反馈</span>
              <span v-else-if="item.classroomStatus===3">已反馈</span>
              <span v-else></span>
              <p>{{item.subschoolName + item.classroomName}}</p>
            </div>
          </li>
        </ul>
      </TabPane>
      <TabPane label="Windows" icon="logo-windows">
        <ul>
          <li v-for="(item,index) in monthListData" :key="index" style="border-bottom: 1px solid #dddddd;">
            <div>
              <p>{{item.classCourseName}}</p>
              <p>{{moment(item.timeFrom).format('HH:mm')}}~{{moment(item.timeTo).format('HH:mm')}}</p>
            </div>
            <div>
              <span v-if="item.classroomStatus===0">待备课</span>
              <span v-else-if="item.classroomStatus===1">已备课</span>
              <span v-else-if="item.classroomStatus===2">待反馈</span>
              <span v-else-if="item.classroomStatus===3">已反馈</span>
              <span v-else></span>
              <p>{{item.subschoolName + item.classroomName}}</p>
            </div>
          </li>
        </ul>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapGetters} from 'vuex';
  import Calendar from 'vue-calendar-component';
  import {Tabs,TabPane} from 'iview';
  import {getToken} from "../../utils";
  import moment from 'moment';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'home',
    components:{Calendar},
    data(){
      return {
        dayLoading:false,
        monthLoading:false
      }
    },
    computed:{
      ...mapGetters(['dayListCount','dayListData','monthListCount','monthListData']),
    },
    methods:{
      ...mapActions(['getDayList']),
      clickDay(data) {
        this.dayLoadData(data);
      },
      changeDate(data) {
        this.loadData(data);
      },
      dayLoadData(date){
        const vm = this;
        const token = getToken();
        const today = date || moment(date).format('YYYY-MM-DD');
        vm.dayLoading = true;
        this.getDayList({token,today}).then(function () {console.log(vm)},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.dayLoading = false;
        });
      },
      monthLoadData(date){
        const vm = this;
        const token = getToken();
        const month = date || moment(date).format('YYYY-MM');
        vm.monthLoading = true;
        this.getDayList({token,month}).then(function (data) {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.monthLoading = false;
        });
      }
    },
    created() {
      this.dayLoadData();
      this.monthLoadData();
    }
  }
</script>
