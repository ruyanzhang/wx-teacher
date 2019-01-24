<template>
  <div>
    <div class="check-head">
      <div class="check-headCon">
        <p><span class="name-title">学生姓名：</span>{{notCheckReportData.studentName}}</p>
        <div><span class="name-title">辅导内容：</span><div>{{notCheckReportData.topicDocName}}</div></div>
        <p><span class="name-title">学科学段：</span>{{notCheckReportData.topCourseName}}·{{notCheckReportData.gradeName}}</p>
        <p><span class="name-title">上课时间：</span>{{notCheckReportData.lessonStartDate}}~{{notCheckReportData.lessonEndDate}}</p>
      </div>
    </div>
    <div >
      <p>本课轨迹记录</p>
      <Subjects :subjects="notCheckReportData.lastHomeworkSubjectLogDTOs"></Subjects>
      <p>知识点掌握情况</p>
      <ul>
        <li v-for="(item,index) in notCheckReportData.knowledgeDTOs" :key="index">
          <p>{{item.knowledgeName}}：</p>
          <div>
            <Slider v-model="notCheckReportData.knowledgeDTOs[index].subjectRightNum" :min="0" :max="100"></Slider>
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
        <Rate v-model="notCheckReportData.activeFocus"/>
      </div>
      <div>
        <span>勤思善问：</span>
        <Rate v-model="notCheckReportData.thinkAsk"/>
      </div>
      <div>
        <span>习惯优良：</span>
        <Rate v-model="notCheckReportData.goodHabits"/>
      </div>
      <div>
        <p>老师的话</p>
        <Input type="textarea" placeholder="请向家长反馈学生的课堂表现，针对学生可提升的地方提出解决方案，并告知家长配合的方向" v-model="notCheckReportData.teacherComment"/>
        <p>请至少输入10个字</p>
      </div>
      <div>
        <span @click="goToReport">预览</span>
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
  Vue.component('Subjects', {
    props:['subjects'],
    methods:{
      changeType(item,type){
        item.type=type;
      }
    },
    template: `<ul>
      <li v-for="(item,index) in subjects" :key="index">
					<p>{{item.moduleName}}</p>
					<div v-html="item.content"></div>
          <div><p>【参考答案】:</p><div v-html="item.answer"></div></div>
          <div><p>【题目解析】:</p><div v-html="item.analysis"></div></div>
					<div>
						<span @click="()=>changeType(item,1)">错题</span>
						<span @click="()=>changeType(item,0)">未用</span>
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
          vm.showNotCheckLoading();
          this.getNotCheckReport(data).then(function () {},function (data) {
            vm.$Message.error(data);
          }).finally(function () {
            vm.hideNotCheckLoading();
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
