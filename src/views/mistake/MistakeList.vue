<template>
  <div class="list-wrap">
    <p style="display: none;">{{curTab}}</p>
    <div>
      <Row :gutter="8">
        <iv-col span="8">
          <iv-select v-model="mistakeGradeCourseId" @on-change="changeSearch">
            <Option v-for="(item,index) in mistakeGradeCourseData"
                    :value="item.gradeCourseId"
                    :key="index">{{item.gradeCourseName}}</Option>
          </iv-select>
        </iv-col>
        <iv-col span="8">
          <iv-select v-model="mistakeStatus" @on-change="changeSearch">
            <Option value="0">未攻克</Option>
            <Option value="1">已攻克</Option>
            <Option value="2">全部</Option>
          </iv-select>
        </iv-col>
        <iv-col span="8">
          <iv-select v-model="mistakeTimeType" @on-change="changeSearch">
            <Option value="0">一周</Option>
            <Option value="1">一个月</Option>
            <Option value="2">三个月</Option>
            <Option value="3">半年</Option>
            <Option value="4">一年</Option>
          </iv-select>
        </iv-col>
      </Row>
    </div>
    <NoData v-if="mistakeListData===null || mistakeGradeCourseData===null" text="当前没有错题"></NoData>
    <div v-else class="flex1 ovh ptb10">
      <scroll class="scroll-wrapper"
              :data="mistakeListData"
              :pullup="true"
              @scrollToEnd="scrollToEnd">
        <div class="scroll-wrapper-content">
          <ul>
            <li v-for="(item,index) in mistakeListData" :key="index" class="task-wrap">
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
          <Loading class="mt10" v-if="$wait.waiting('getMistakeList')"></Loading>
          <div v-else-if="hasMistakeData===false">暂无更多数据！</div>
        </div>

      </scroll>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
import NoData from '@/components/no-data'
import moment from 'moment'
import { Select, Row, Col, Option } from 'iview'
Vue.component('ivSelect', Select)
Vue.component('Row', Row)
Vue.component('ivCol', Col)
Vue.component('Option', Option)
export default {
  name: 'mistakeList',
  props:['curTab', 'hasMistake'],
  components:{ Scroll, Loading, NoData },
  data(){
    return {
      mistakeGradeCourseId: '',
      mistakeStatus: '',
      mistakeTimeType: '',
      mistakePage: 0
    }
  },
  computed:{
    ...mapGetters(['mistakeListData', 'mistakeGradeCourseData', 'hasMistakeData'])
  },
  methods:{
    ...mapActions(['getMistakeList','getMistakeCourse']),
    moment: moment,
    changeSearch() {
      this.mistakePage = 1
      this.getMistakeListData({ mistakePage: this.mistakePage })
    },
    scrollToEnd() {
      this.getMistakeListData({ mistakePage: ++this.mistakePage })
    },
    getMistakeListData(data = {}) {
      if (this.$wait.waiting("getMistakeList")) {
        return false
      }
      this.$wait.start('getMistakeList')
      this.getMistakeList({
        mistakeGradeCourseId: this.mistakeGradeCourseId,
        mistakeStatus: this.mistakeStatus,
        mistakeTimeType: this.mistakeTimeType,
        ...data
      }).finally(() => {
        this.$wait.end('getMistakeList')
      })
    }
  },
  created() {
    this.getMistakeCourse()
    this.getMistakeListData()
  }
}
</script>
<style scoped lang="less">

</style>
