<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">{{loading ? '登陆中...':'登录'}}</Button>
    </FormItem>
  </Form>
</template>

<script>
    import Vue from 'vue';
    import {mapActions} from 'vuex';
    import { Form, FormItem,Input,Icon,Button} from 'iview';
    Vue.component('Form', Form);
    Vue.component('FormItem', FormItem);
    Vue.component('Input', Input);
    Vue.component('Icon', Icon);
    Vue.component('Button', Button);
    export default {
      name: "login",
      data () {
        return {
          loading:false,
          formInline: {
            user: '',
            password: ''
          },
          ruleInline: {
            user: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码必须大于6位', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        ...mapActions(['login']),
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              const vm = this;
              const {user,password} = this.formInline;
              vm.loading = true;
              vm.login({
                user,password
              }).then(function (data) {
                vm.onSuccess(data)
              },function (data) {
                vm.onFail(data);
              }).finally(function () {
                vm.onFinally();
              });
            }
          })
        },
        onFinally(){
          this.loading = false;
        },
        onSuccess(data){
          window.localStorage.setItem('token',data.token);
          this.$router.push({name: 'home'});
        },
        onFail(data){
          this.$Message.error(data)
        }
      }
    }
</script>

<style scoped>

</style>
