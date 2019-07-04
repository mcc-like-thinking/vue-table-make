<template>
	<div class="app-container">
		<h5>demo1</h5>
		<anchored-heading :level="1">Hello World!</anchored-heading>
		<p>createElement函数返回虚拟节点，VNode</p>
	</div>
</template>

<script>
  import AnchoredHeading from './AnchoredHeading'
  export default {
    name: "jsxFunc",
    components: {
    	AnchoredHeading
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>