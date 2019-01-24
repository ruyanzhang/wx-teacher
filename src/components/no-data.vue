<template>
  <div class="tc">
    <img :src="require('@/images/no-timeable.png')" class="img"/>
    <p class="text">{{text}}</p>
  </div>
</template>

<script>
    export default {
        name: "no-data",
        props:['text']
    }
</script>

<style scoped>
  .img{
    width: 60%;
  }
  .text{
    padding: 10px 0 20px 0;
  }
</style>
