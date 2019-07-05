<template>
  <router-link :to="url" class="nav-link">
    <slot :user="name"></slot>
  </router-link>
</template>

<script>
  export default {
    name: "Comp2",
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