<template>
  <div class="check">
    <div class="check-head">
      <p><span class="check-head-title">学生姓名：</span>{{notCheckReportData.studentName}}</p>
      <div><span class="check-head-title">辅导内容：</span>{{notCheckReportData.topicDocName}}</div>
      <p><span class="check-head-title">学科学段：</span>{{notCheckReportData.topCourseName}}·{{notCheckReportData.gradeName}}</p>
      <p><span class="check-head-title">上课时间：</span>{{notCheckReportData.lessonStartDate}}~{{notCheckReportData.lessonEndDate}}</p>
    </div>
    <div class="check-block">
      <p class="check-block-title">本课轨迹记录</p>
      <Subjects :subjects="notCheckReportData.lastHomeworkSubjectLogDTOs"></Subjects>
    </div>
    <div class="check-block">
      <p class="check-block-title">知识点掌握情况</p>
      <ul>
        <li v-for="(item,index) in notCheckReportData.knowledgeDTOs" :key="index" class="mt10">
          <p>{{item.knowledgeName}}：</p>
          <div>
            <Slider v-model="notCheckReportData.knowledgeDTOs[index].subjectRightNum" :min="0" :max="100"></Slider>
          </div>
          <div class="slider-text flex flex-jsb">
            <span>差</span>
            <span>中</span>
            <span>优</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="check-block">
      <p class="check-block-title">课堂表现</p>
      <div class="mt10">
        <span>主动专注：</span>
        <Rate v-model="notCheckReportData.activeFocus"/>
      </div>
      <div  class="mt10">
        <span>勤思善问：</span>
        <Rate v-model="notCheckReportData.thinkAsk"/>
      </div>
      <div  class="mt10">
        <span>习惯优良：</span>
        <Rate v-model="notCheckReportData.goodHabits"/>
      </div>
    </div>
    <div class="check-block">
      <p class="check-block-title">老师的话</p>
      <Input type="textarea" class="w-100 mt10"  :rows="4" placeholder="请向家长反馈学生的课堂表现，针对学生可提升的地方提出解决方案，并告知家长配合的方向" v-model="notCheckReportData.teacherComment"/>
      <p class="tr">请至少输入10个字</p>
    </div>
    <div class="send-button" @click="goToReport">预览</div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapMutations} from 'vuex';
  import {Slider,Rate,Input} from 'iview';
  Vue.component('Input', Input);
  Vue.component('Slider', Slider);
  Vue.component('Rate', Rate);
  Vue.component('Subjects', {
    props:['subjects'],
    methods:{
      changeType(item,index,type){
        item.type=type;
        if(type===1){
          this.$refs['error'+index][0].classList.add('active');
          this.$refs['unUse'+index][0].classList.remove('active');
        }else{
          this.$refs['unUse'+index][0].classList.add('active');
          this.$refs['error'+index][0].classList.remove('active');
        }
      }
    },
    template: `<ul>
      <li v-for="(item,index) in subjects" :key="index" class="task border-bottom">

					<div>{{index+1}}.</div>
					  <div class="ml5">
              <div v-html="item.content"></div>
              <div><p class="fl blue">【参考答案】:</p><div v-html="item.answer"></div></div>
              <div><p class="fl blue">【题目解析】:</p><div v-html="item.analysis"></div></div>
              <div class="mt10 tr">
                <span @click="()=>changeType(item,index,1)" class="task-button" :ref="'error'+index">错题</span>
                <span @click="()=>changeType(item,index,0)" class="task-button" :ref="'unUse'+index">未用</span>
              </div>
            </div>
      </li>
    </ul>`
  });
  export default {
      name: "Check",
      props:['id'],
      computed:{
        ...mapState({
          notCheckReportData:(state)=>JSON.parse(JSON.stringify(state.report.notCheckReportData)),
        })
      },
      methods:{
        ...mapActions(['getNotCheckReport','saveReport']),
        ...mapMutations(['showNotCheckLoading','hideNotCheckLoading']),
        getNotCheckReportData(data){
          const vm = this;
          vm.$wait.start('getNotCheckReportData');
          this.getNotCheckReport(data).then(()=>{},(data) => {
            vm.$Message.error(data);
          }).finally(() => {
            vm.$wait.end('getNotCheckReportData');
          });
        },
        goToReport(){
          const vm = this;
          vm.saveReport(vm.notCheckReportData).then(()=>{
            vm.$router.push({
              name:'report',
              query:{
                id:vm.id
              }
            })
          });
        }
      },
      created(){
        const vm = this;
        vm.getNotCheckReportData({
          id:vm.id
        });
      }
  }
</script>

<style scoped>


</style>
