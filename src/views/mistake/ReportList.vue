<template>
  <div class="report-content">
    <div class="flex1 ovh pb10">
      <scroll class="scroll-wrapper"
              :data="reportList"
              :pullup="true"
              @scrollToEnd="scrollToEnd">
        <div class="scroll-wrapper-content">
          <ul>
            <li v-for="(item,index) in reportList" :key="index" @click="()=>goToCheck(item.id)">
              <div>
                <p>{{item.classCourseName}}</p>
                <p>{{item.studentName}}</p>
                <p>{{item.lessonTime}}</p>
              </div>
              <div>
                <p>{{item.submitDate}} 提交</p>
              </div>
              <div>
                <div>
                  <p><Rate disabled :value="item.score" /></p>
                  <p>{{item.evaluation}}</p>
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
  import {Rate} from 'iview';
  Vue.component('Rate', Rate);
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
      goToCheck(id){
        this.$router.push({
          name:'check',
          query:{
            id:id
          }
        })
      },
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
