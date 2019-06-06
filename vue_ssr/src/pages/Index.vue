<template>
  <div>
    This is index pages!
    {{ item }}
  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log('mounted')
    return store.dispatch('fetchItem');
  },
  mounted () {
    console.log('mounted');
    this.$store.dispatch('fetchItem').then(res => {
      console.log('over')
    });
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items
    }
  }
}
</script>