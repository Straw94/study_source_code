<template>
  <div class="login-content">
    <input v-model='form.username'>
    <input v-model='form.password'>
    <button @click='login'>登陆</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        username: 'ar',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.form)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
