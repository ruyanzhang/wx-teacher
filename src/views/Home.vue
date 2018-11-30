<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Button>dfdf</Button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button, Table } from 'iview';
export default {
  name: 'home',
  components: {
    HelloWorld,
    Button
  }
}
</script>
