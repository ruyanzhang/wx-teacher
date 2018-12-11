<template>
  <div style="height: 800px;">
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
    <!--<scroll class="wrapper"
            :data="mistakeList"
            pulldown="pulldown"
            @pulldown="$emit('mistakeLoadData')" style="height: 300px;">
      <ul class="content">
        <li v-for="(item,index) in mistakeList" :key="index">{{item}}</li>
      </ul>
      <Loading v-if="mistakeLoading"></Loading>
    </scroll>-->
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
      }
    },
    created() {

    }
  }
</script>
