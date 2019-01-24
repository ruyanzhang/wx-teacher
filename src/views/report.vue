<template>
  <div>
    <div class="check-head">
      <div class="check-headCon">
        <p><span class="name-title">学生姓名：</span>{{checkReportData.studentName}}</p>
        <div><span class="name-title">辅导内容：</span><div>{{checkReportData.topicDocName}}</div></div>
        <p><span class="name-title">学科学段：</span>{{checkReportData.topCourseName}}·{{checkReportData.gradeName}}</p>
        <p><span class="name-title">上课时间：</span>{{checkReportData.lessonStartDate}}~{{checkReportData.lessonEndDate}}</p>
      </div>
    </div>
    <div>
      <p>课堂风采</p>
      <div>
        <div v-for="(item,index) in checkReportData.imageUrls" :key="index">
          <img :src="item.url" alt="" style="width: 100px;"/>
        </div>
      </div>
    </div>
    <div>
      <p>上次课作业</p>
      <div>
        <div>总题数</div>
        <div :style="{width:checkReportData.lastWorkSubjectNum+'%'}">{{checkReportData.lastWorkSubjectNum}}</div>
        <div>完成数</div>
        <div :style="{width:checkReportData.lastWorkSubjectFinishNum+'%'}">{{checkReportData.lastWorkSubjectFinishNum}}</div>
        <div>正确数</div>
        <div :style="{width:checkReportData.lastWorkSubjectRightNum+'%'}">{{checkReportData.lastWorkSubjectRightNum}}</div>
      </div>
     </div>
      <p>知识点掌握情况</p>
      <ul>
        <li v-for="(item,index) in checkReportData.knowledgeDTOs" :key="index">
          <p>{{item.knowledgeName}}：</p>
          <div>
            <Slider v-model="checkReportData.knowledgeDTOs[index].subjectRightNum" :min="0" :max="100" disabled></Slider>
          </div>
          <p>
            <span>差</span>
            <span>中</span>
            <span>优</span>
          </p>
        </li>
      </ul>
      <p>课堂表现</p>
      <div>
        <span>主动专注：</span>
        <Rate v-model="checkReportData.activeFocus" disabled/>
      </div>
      <div>
        <span>勤思善问：</span>
        <Rate v-model="checkReportData.thinkAsk" disabled/>
      </div>
      <div>
        <span>习惯优良：</span>
        <Rate v-model="checkReportData.goodHabits" disabled/>
      </div>
      <div>
        <p>老师的话</p>
        <Input type="textarea" disabled v-model="checkReportData.teacherComment"/>
        <p>请至少输入10个字</p>
      </div>
      <div>
        <span @click="sendReport">发送报告</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapMutations} from 'vuex';
  import {Slider} from 'iview';
  import {Rate} from 'iview';
  Vue.component('Slider', Slider);
  Vue.component('Rate', Rate);
  export default {
    name: "report",
    props:['id'],
    computed:{
      ...mapState({
        checkReportData:(state)=>JSON.parse(JSON.stringify(state.report.checkReportData)),
      })
    },
    methods:{
      ...mapActions(['getCheckReport']),
      ...mapMutations(['showCheckLoading','hideCheckLoading']),
      sendReport(){

      }
    },
    created(){
      const vm = this;
      vm.getCheckReport({
        id:vm.id
      });
    }
  }
</script>

<style scoped>

</style>
