<template>
  <div class="yy">
    <Button>Default</Button>
  </div>

</template>

<script>
    import Vue from 'vue';
    import { Button, Table } from 'iview';
    Vue.component('Button', Button);
    Vue.component('Table', Table);
    export default {
        name: "login",
        component:[Button,Table]
    }
</script>

<style scoped>
.yy{
  width: 300px;
}
</style>
