<template>
  <div class="check">
    <Loading v-if="$wait.waiting('getCheckReport')"></Loading>
    <div v-else>
      <div class="check-head">
        <p><span class="check-head-title">学生姓名：</span>{{checkReportData.studentName}}</p>
        <div><span class="check-head-title">辅导内容：</span>{{checkReportData.topicDocName}}</div>
        <p><span class="check-head-title">学科学段：</span>{{checkReportData.topCourseName}}·{{checkReportData.gradeName}}</p>
        <p><span class="check-head-title">上课时间：</span>{{checkReportData.lessonStartDate}}~{{checkReportData.lessonEndDate}}</p>
      </div>
      <div class="check-block">
        <p class="check-block-title">课堂风采</p>
        <div class="flex flex-jsb flex-wrap mt10">
          <div v-for="(item,index) in checkReportData.imageUrls" :key="index" class="img-wrap" @click="()=>imgClick(item.url)">
            <img :src="item.url" alt="" style="margin: auto;"/>
          </div>
          <div class="img-empty"></div>
          <div class="img-empty"></div>
        </div>
      </div>
      <div class="check-block">
        <p class="check-block-title">上次课作业</p>
        <div>
          <div class="flex flex-ac mt10">
            <div>总题数</div>
            <div class="flex1">
              <div :style="{width:checkReportData.lastWorkSubjectNum+'%'}" class="flex1 last-value yellow">{{checkReportData.lastWorkSubjectNum}}</div>
            </div>
          </div>
          <div class="flex flex-ac mt4">
            <div>完成数</div>
            <div class="flex1">
              <div :style="{width:checkReportData.lastWorkSubjectFinishNum+'%'}" class="flex1 last-value blue">{{checkReportData.lastWorkSubjectFinishNum}}</div>
            </div>
          </div>
          <div class="flex flex-ac mt4">
            <div>正确数</div>
            <div class="flex1">
              <div :style="{width:checkReportData.lastWorkSubjectRightNum+'%'}" class="flex1 last-value green">{{checkReportData.lastWorkSubjectRightNum}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="check-block">
        <p class="check-block-title">知识点掌握情况</p>
        <ul>
          <li v-for="(item,index) in checkReportData.knowledgeDTOs" :key="index" class="mt10">
            <p>{{item.knowledgeName}}：</p>
            <div>
              <Slider v-model="checkReportData.knowledgeDTOs[index].subjectRightNum" :min="0" :max="100" disabled></Slider>
            </div>
            <div class="flex flex-jsb slider-text">
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
          <Rate v-model="checkReportData.activeFocus" disabled/>
        </div>
        <div class="mt10">
          <span>勤思善问：</span>
          <Rate v-model="checkReportData.thinkAsk" disabled/>
        </div>
        <div class="mt10">
          <span>习惯优良：</span>
          <Rate v-model="checkReportData.goodHabits" disabled/>
        </div>
      </div>
      <div class="check-block">
        <p class="check-block-title">老师的话</p>
        <p class="mt10">{{checkReportData.teacherComment}}</p>
      </div>
      <div v-if="$wait.waiting('sendReport')" class="send-button">发送中...</div>
      <div v-else @click="sendToReport" class="send-button">发送报告</div>
    </div>
    <div ref="imgMask" @click="imgMaskClick" class="img-mask"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapActions,mapState} from 'vuex';
  import Loading from '@/components/loading';
  import {Slider,Rate} from 'iview';
  Vue.component('Slider', Slider);
  Vue.component('Rate', Rate);
  export default {
    name: "report",
    components:{Loading},
    props:['id'],
    computed:{
      ...mapState({
        checkReportData:(state)=>JSON.parse(JSON.stringify(state.report.checkReportData)),
        checkReportLoading2:(state)=>state.report.checkReportLoading2
      })
    },
    methods:{
      ...mapActions(['getCheckReport','sendReport']),
      sendToReport(){
        const vm = this;
        if(vm.$wait.waiting('sendReport')){
          return;
        }
        vm.$wait.start('sendReport');
        vm.sendReport({
          id:vm.id
        }).then((data)=>{
          vm.$Message.success({
            content:data.msg,
            onClose(){
              vm.$router.push({
                'name':'mistake'
              })
            }
          })
        },(data)=>{
          vm.$Message.error(data);
        }).finally(()=>{
          vm.$wait.end('sendReport');
        });
      },
      imgMaskClick(){
        this.$refs.imgMask.style.display = "none";
      },
      imgClick(url){
        this.$refs.imgMask.style.backgroundImage = `url("${url}")`;
        this.$refs.imgMask.style.display = "block";
      }
    },
    created(){
      const vm = this;
      vm.$wait.start('getCheckReport');
      vm.getCheckReport({
        id:vm.id
      }).then(()=>{},(data)=>{vm.$Message.error(data);}).finally(()=>{
        vm.$wait.end('getCheckReport');
      });
    }
  }
</script>

<style scoped lang="less">
  .img-wrap{
    width: 30%;
    height: 100px;
    overflow: hidden;
    display: flex;
    background-color: #eeeeee;
  }
  .img-empty {
    height: 0;
    width: 30%;
  }
 .last-value{
   border-top-right-radius: 5px;
   border-bottom-right-radius: 5px;
   font-size: 12px;
   color: #fff;
   padding: 4px 6px;
   text-align: right;
   margin-left: 10px;
   &.yellow{
     background-color: #ffb71b;
   }
   &.blue{
     background-color: #5aaff1;
   }
   &.green{
     background-color: #32daa8;
   }
 }
  .img-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    background-color: rgba(0,0,0,0.5);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
