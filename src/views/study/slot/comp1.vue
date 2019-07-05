<template>
  <router-link :to="url" class="nav-link">
    <slot>后备内容，当父级组件中不提供任何插槽内容时，后备内容就会被渲染</slot>
  </router-link>
</template>

<script>
  export default {
    name: "Comp1",
    props: {
      url: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        name: 'scc'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>