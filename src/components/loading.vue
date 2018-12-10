<template>
  <Spin>
    <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
    <div style="margin-top: 4px;">加载中...</div>
  </Spin>
</template>

<script>
  import Vue from 'vue';
  import {Spin,Icon} from 'iview';
  Vue.component('Spin', Spin);
  Vue.component('Icon', Icon);
    export default {
        name: "loading"
    }
</script>

<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
