<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
  </Form>
</template>

<script>
    import Vue from 'vue';
    import { Form, FormItem,Input,Icon,Button } from 'iview';
    Vue.component('Form', Form);
    Vue.component('FormItem', FormItem);
    Vue.component('Input', Input);
    Vue.component('Icon', Icon);
    Vue.component('Button', Button);
    export default {
      name: "login",
      component:[Form, FormItem,Input,Icon,Button],
      data () {
        return {
          formInline: {
            user: '',
            password: ''
          },
          ruleInline: {
            user: [
              { required: true, message: 'Please fill in the user name', trigger: 'blur' }
            ],
            password: [
              { required: true, message: 'Please fill in the password.', trigger: 'blur' },
              { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
