<template>
  <div class="home">
    <div class="calendar-wrap">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"></Calendar>
    </div>
    <div style="padding: 0 10px;">
      <Tabs :value="curTab" :animated="false" type="card">
        <TabPane label="日课程" name="day">
          <Loading v-if="dayLoading"></Loading>
          <div v-else>
            <div v-if="dayListData.length===0">
              <img :src="require('@/images/no-timeable.png')"/>
              <p>当前日期无排课</p>
            </div>
            <ul v-else>
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
          </div>
        </TabPane>
        <TabPane label="月课程" name="month">
          <Loading v-if="monthLoading"></Loading>
          <div v-else>
            <NoData v-if="monthListData.length===0" text="当前月无排课"></NoData>
            <ul v-else>
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
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapGetters} from 'vuex';
  import Calendar from 'vue-calendar-component';
  import Loading from '@/components/loading';
  import NoData  from '@/components/no-data';
  import {getToken} from "../../utils";
  import moment from 'moment';
  import {Tabs,TabPane} from 'iview';
  Vue.component('Tabs', Tabs);
  Vue.component('TabPane', TabPane);
  export default {
    name: 'home',
    components:{Calendar,Loading,NoData},
    data(){
      return {
        dayLoading:false,
        monthLoading:false,
        curTab:'day'
      }
    },
    computed:{
      ...mapGetters(['dayListCount','dayListData','monthListCount','monthListData'])
    },
    methods:{
      ...mapActions(['getDayList','getMonthList']),
      moment:moment,
      clickDay(data) {
        this.curTab = 'day';
        this.dayLoadData(data);
      },
      changeDate(data) {
        this.curTab = 'month';
        this.monthLoadData(data);
      },
      dayLoadData(date){
        const vm = this;
        const token = getToken();
        const today = moment(new Date(date)).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
        vm.dayLoading = true;
        this.getDayList({token,today}).then(function () {},function (data) {
          vm.$Message.error(data);
        }).finally(function () {
          vm.dayLoading = false;
        });
      },
      monthLoadData(date){
        const vm = this;
        const token = getToken();
        const month = moment(new Date(date)).format('YYYY-MM') || moment().format('YYYY-MM');
        vm.monthLoading = true;
        this.getMonthList({token,month}).then(function (data) {},function (data) {
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
