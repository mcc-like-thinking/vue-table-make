<template>
	<div class="app-container">
		<h3>自定义过滤器： 可被用于一些常见的文本格式化</h3>

		<br>
		<h5>demo1</h5>
		<p>{{ message | capitalize }}</p>
		<p>message作为参数传递至过滤器函数capitalize</p>

		<br>
		<h5>demo2</h5>
		<p>{{ message | filterA }}</p>
		<p>{{ message | filterA | filterB }}</p>
		<p>message作为参数传递至过滤器函数filterA， filterA 的结果传递到 filterB 中</p>

		<br>
		<h5>demo3</h5>
		<p>{{ message | filterC('你好，', {name:'世界'}) }}</p>
		<p>filterC 被定义为接收三个参数的过滤器函数</p>
		<p>message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数</p>
	</div>
</template>

<script>
  export default {
    name: "filterComp",
    data() {
    	return {
    		message: 'hello world!'
    	}
    },
    filters: {
	  capitalize: function (value) { 
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  },
	  filterA: function(value) {
	  	if (!value) return ''
	  	value = value.toString()
	    return value.toUpperCase()
	  },
	  filterB: function(value) {
	  	if (!value) return ''
	  	value = value.toString()
	    return value.toLowerCase()
	  },
	  filterC: function(value, arg1, arg2) {
	  	if (!value) return ''
	    return value + '  ' + arg1 + arg2.name
	  }
	},
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>