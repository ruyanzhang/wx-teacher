<template>
  <div class="home">
    <div class="calendar-wrap">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"></Calendar>
    </div>
    <div style="padding: 0 16px;">
      <Tabs v-model="curTab" :animated="false" type="card">
        <TabPane label="日课程" name="day">
          <Loading v-if="dayLoading"></Loading>
          <div v-else>
            <NoData v-if="dayListData.length===0" text="当前日期无排课"></NoData>
            <ul v-else>
              <li v-for="(item,index) in dayListData" :key="index" class="course-item">
                <div class="flex flex-ac flex-jsb">
                  <p class="course-item-name">{{item.classCourseName}}</p>
                  <p>{{moment(item.timeFrom).format('HH:mm')}}~{{moment(item.timeTo).format('HH:mm')}}</p>
                </div>
                <div class="flex flex-ac flex-jsb">
                  <span v-if="item.classroomStatus===0" class="course-item-label">待备课</span>
                  <span v-else-if="item.classroomStatus===1"  class="course-item-label course-item-blueLabel">已备课</span>
                  <span v-else-if="item.classroomStatus===2" class="course-item-label">待反馈</span>
                  <span v-else-if="item.classroomStatus===3" class="course-item-label course-item-greenLabel">已反馈</span>
                  <span v-else></span>
                  <p class="course-item-position">{{item.subschoolName + item.classroomName}}</p>
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
              <li v-for="(item,index) in monthListData" :key="index" class="course-item">
                <div class="flex flex-ac flex-jsb">
                  <p class="course-item-name">{{item.classCourseName}}</p>
                  <p>{{moment(item.timeFrom).format('HH:mm')}}~{{moment(item.timeTo).format('HH:mm')}}</p>
                </div>
                <div class="flex flex-ac flex-jsb">
                  <span v-if="item.classroomStatus===0" class="course-item-label">待备课</span>
                  <span v-else-if="item.classroomStatus===1" class="course-item-label course-item-blueLabel">已备课</span>
                  <span v-else-if="item.classroomStatus===2" class="course-item-label">待反馈</span>
                  <span v-else-if="item.classroomStatus===3" class="course-item-label course-item-greenLabel">已反馈</span>
                  <span v-else></span>
                  <p class="course-item-position">{{item.subschoolName + item.classroomName}}</p>
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
  import {mapActions,mapGetters} from 'vuex';
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
<style scoped lang='less'>
  .course-item{
    padding: 14px 0;
    border-bottom: 1px solid #dddddd;
    background-color: #fff;
    &:last-child{
      border-bottom: none;
    }
  }
  .course-item-name{
    font-size: 16px;
    color: #222;
  }
  .course-item-label{
    color: #ff6e0e;
    font-size: 12px;
    border: 1px solid #ff6e0e;
    border-radius: 3px;
    padding: 0 2px;
  }
  .course-item-blueLabel{
    color: #1e98e2;
    border-color: #1e98e2;
  }

  .course-item-greenLabel{
    color:#22ac38;
    border-color:#22ac38;
  }
  .course-item-position{
    color: #999;
  }
</style>
