<template>
  <div class="list-wrap">
    <p style="display: none;">{{curTab}}</p>
    <div>
      <Row :gutter="8">
        <Col span="8">
          <Select :value="mistakeGradeCourseId" @on-change="(value)=>changeSearch('mistakeGradeCourseId',value)">
            <Option v-for="(item,index) in mistakeGradeCourse"
                    :value="item.gradeCourseId"
                    :key="index">{{item.gradeCourseName}}</Option>
          </Select>
        </Col>
        <Col span="8">
          <Select :value="mistakeStatus" @on-change="(value)=>changeSearch('mistakeStatus',value)">
            <Option value="0">未攻克</Option>
            <Option value="1">已攻克</Option>
            <Option value="2">全部</Option>
          </Select>
        </Col>
        <Col span="8">
          <Select :value="mistakeTimeType" @on-change="(value)=>changeSearch('mistakeTimeType',value)">
            <Option value="0">一周</Option>
            <Option value="1">一个月</Option>
            <Option value="2">三个月</Option>
            <Option value="3">半年</Option>
            <Option value="4">一年</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="flex1 ovh ptb10">
      <scroll class="scroll-wrapper"
              :data="mistakeList"
              :pullup="true"
              @scrollToEnd="scrollToEnd">
        <div class="scroll-wrapper-content">
          <ul>
            <li v-for="(item,index) in mistakeList" :key="index" class="task-wrap">
              <div class="task">
                <div>{{index+1}}.</div>
                <div class="ml5">
                  <div v-html="item.content"></div>
                  <div class="mt4">
                    <p class="fl blue">【参考答案】:</p>
                    <div v-html="item.answer"></div>
                  </div>
                  <div>
                    <p class="fl blue">【题目解析】:</p>
                    <div v-html="item.analysis"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <Loading class="mt10" v-if="mistakeLoading"></Loading>
          <div v-else-if="hasMistake===false">暂无更多数据！</div>
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
  import {Select,Row,Col,Option} from 'iview';
  Vue.component('Select', Select);
  Vue.component('Row', Row);
  Vue.component('Col', Col);
  Vue.component('Option', Option);
  export default {
    name: 'mistakeList',
    props:['curTab','mistakeLoading','mistakeList','mistakeGradeCourse','mistakeGradeCourseId','mistakeStatus','mistakeTimeType','hasMistake'],
    components:{Scroll,Loading},
    data(){
      return {

      }
    },
    computed:{

    },
    methods:{
      moment:moment,
      changeSearch(type,value){
        this.$emit('changeSearch',type,value)
      },
      scrollToEnd(){
        this.$emit('searchMistakeList');
      }
    },
    created() {

    }
  }
</script>
<style scoped lang="less">

</style>
