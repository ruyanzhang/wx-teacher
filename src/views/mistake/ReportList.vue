<template>
  <div class="report-content">
    <div class="flex1 ovh ptb10">
      <scroll class="scroll-wrapper"
              :data="reportList"
              :pullup="true"
              @scrollToEnd="scrollToEnd">
        <div class="scroll-wrapper-content">
          <ul>
            <li>
              <div>
                <p>{obj.classCourseName}</p>
                <p>{obj.studentName}</p>
                <p>{obj.lessonTime}</p>
              </div>
              <div>
                <p>{obj.submitDate.substr(0,10)}</p>
                <p>{obj.submitDate.substr(10)}提交</p>
              </div>
              <div>
                <div>
                  <p>{star(obj.one2oneEvaluateDTO.score)}</p>
                  <p>{obj.one2oneEvaluateDTO.evaluation}</p>
                </div>
              </div>
            </li>
          </ul>
          <Loading class="mt10" v-if="reportLoading"></Loading>
          <div v-else-if="hasReport===false">暂无更多数据！</div>
        </div>

      </scroll>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Scroll from '@/components/scroll';
  import Loading from '@/components/loading';
  import moment from 'moment';
  export default {
    name: 'reportList',
    props:['reportLoading','reportList','hasReport'],
    components:{Scroll,Loading},
    data(){
      return {
      }
    },
    computed:{

    },
    methods:{
      moment:moment,
      scrollToEnd(){
        this.$emit('searchReportList');
      }
    },
    created() {

    }
  }
</script>
<style scoped>
  .report-content{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
