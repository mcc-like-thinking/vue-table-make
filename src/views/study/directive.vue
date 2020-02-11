<template>
	<div class="app-container">
		<h3>自定义指令： 对普通DOM元素进行底层操作</h3>

		<br>
		<h5>demo1</h5>
		<input type="text" v-focus>

		<br>
		<h5>指令定义对象的钩子函数</h5>
		<p>bind 只调用一次，指令第一次绑定到元素时调用</p>
		<p>inserted 当被绑定元素插入父节点时调用</p>
		<p>update 所在组件的 VNode 更新时调用, 指令的值可能发生了改变</p>

		<br>
		<h5>动态指令参数</h5>
		<p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
	</div>
</template>

<script>
  export default {
    name: "directive",
    data() {
    	return {
    		direction: 'left'
    	}
    },
    directives: {
    	// 注册局部指令
    	focus: {
    		// 指令的定义
    		inserted: function (el) { // inserted指令定义对象的钩子函数 当被绑定元素插入父节点时调用
    			el.focus()
    		}
    	},
    	pin: {
    		bind: function (el, binding, vnode) {
			    el.style.position = 'fixed'
			    var s = (binding.arg == 'left' ? 'left' : 'top')
			    el.style[s] = binding.value + 'px'
			}
    	}
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>