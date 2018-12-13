<template>
  <div class="mistake-content">
    <div style="padding: 0 10px;">
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
            <li v-for="(item,index) in mistakeList" :key="index" style="border-bottom: 1px solid #dddddd;">
              <span>{{index+1}}. </span>
              <div>
                <div v-html="item.content"></div>
                <div>
                  <p>【参考答案】:</p>
                  <div v-html="item.answer"></div>
                </div>
                <div>
                  <p>【题目解析】:</p>
                  <div v-html="item.analysis"></div>
                </div>
              </div>
            </li>
          </ul>
          <Loading class="mt10" v-if="mistakeLoading"></Loading>
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
    props:['mistakeLoading','mistakeList','mistakeGradeCourse','mistakeGradeCourseId','mistakeStatus','mistakeTimeType'],
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
<style scoped>
  .mistake-content{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
