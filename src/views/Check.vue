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
      <p>上次课作业记录</p>
      {lastSubjectsView}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapActions,mapState,mapMutations} from 'vuex';
  Vue.component('Subjects',{

  });
  export default {
      name: "Check",
      props:['id'],
      computed:{
        ...mapState({
          notCheckReportData:(state)=>state.report.notCheckReportData,
        })
      },
      methods:{
        ...mapActions(['getNotCheckReport']),
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
