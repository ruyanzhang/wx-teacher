<template>
  <div class="icon-wrap">
    <div class="icon home" :class="{'home-show':isShow}" @click="() => goTo('home')">
      <Icon type="ios-timer" size="36" color="#57a3f3"/>
    </div>
    <div class="icon report" :class="{'report-show':isShow}" @click="() => goTo('mistake')">
      <Icon type="md-list-box" size="34" color="#57a3f3"/>
    </div>
    <div class="icon login-out" :class="{'login-out-show':isShow}" @click="() => goTo('login')">
      <Icon type="md-log-out" size="36" color="#57a3f3"/>
    </div>
    <div class="icon icon-menu" @click="iconChange">
      <Icon type="md-remove-circle" size="36" color="#57a3f3" v-if="isShow"/>
      <Icon type="md-add-circle" size="36" color="#57a3f3" v-else/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapMutations} from 'vuex'
import {Icon} from 'iview'
Vue.component('Icon', Icon)
export default {
  name: "navBar",
  props: ['current'],
  data: function () {
    return {
      isShow:false
    }
  },
  methods: {
    ...mapMutations(['logout']),
    iconChange() {
      this.isShow = !this.isShow
    },
    goTo(type) {
      const current = this.current
      if (type === current) {
        return
      }
      if(type === 'mistake'){
        this.$router.push({
          name: 'mistake'
        })
      }else if(type ==='home'){
        this.$router.push({
          name: 'home'
        })
      }else if(type === 'login'){
        this.logout()
        this.$router.push({
          name: 'login'
        })
      }
      this.isShow = !this.isShow
    }
  }
}
</script>
<style scoped>
  .icon-wrap{
    position: fixed;
    bottom: 40px;
    right: 20px;
    width: 36px;
    height: 36px;
  }
  .icon{
    position: absolute;
    border-radius: 50%;
    background-color: #ffffff;
    transition: transform 0.3s ease-out;
    border: 1px solid #ffffff;
  }
  .home-show{
    transform: translate(-30px,-36px);
  }
  .report-show{
    transform: translate(-56px,0);
  }
  .login-out-show{
    transform: translate(-30px,36px);
  }
</style>
