<template>
	<div class="app-container">
		<h5>demo1</h5>
		<comp1 url="/jsx">
			<span class="fa fa-user"></span>
            My name is {{name}}
		</comp1>
		<p>插槽：<code>&lt;slot&gt;&lt;/slot&gt;</code>内可以包含任何模板代码，包括html、甚至自定义组件</p>
		<p>父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的</p>

		<br>
		<h5>demo2</h5>
		<comp1 url="/jsx"></comp1>

		<br>
		<!-- <h5>老的写法</h5>
		<p>slot="filterForm" slot-scope="{query}"</p> -->

		<br>
		<h5>demo3</h5>
		<h5>作用域插槽：让插槽内容可以访问子组件中才有的数据</h5>
		<comp2 url="/jsx" v-slot="slotProps">
			My name is {{slotProps.user}}
		</comp2>

		<br>
		<comp2 url="/jsx" v-slot="{ user }">
			My name is {{user}}
		</comp2>
	</div>
</template>

<script>
  import comp1 from './comp1'
  import comp2 from './comp2'
  export default {
    name: "SlotComp",
    components: {
      comp1,
      comp2
    },
    data() {
    	return {
    		name: 'mcc'
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>