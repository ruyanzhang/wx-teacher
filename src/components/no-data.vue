<template>
  <div>
    <img :src="require('@/images/no-timeable.png')"/>
    <p>{{text}}</p>
  </div>
</template>

<script>
    export default {
        name: "no-data",
        props:['text']
    }
</script>

<style scoped>

</style>
