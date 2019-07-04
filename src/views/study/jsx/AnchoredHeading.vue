<script>
  export default {
    name: "AnchoredHeading",
    props: {
	    level: {
	      type: Number,
	      required: true
	    }
	},
	created() {
		console.log('created', this.$slots)
	},
	render: function (createElement) { // 渲染函数
	    return createElement(
	      'h' + this.level,   // 标签名称
	      { // VNode 数据对象
	      	class: {
	      		foo: true,
	      		bar: false
	      	},
	      	style: {
	      		color: 'red',
	      		fontSize: '18px'
	      	},
	      	attrs: {
			    id: 'foo'
			},
			props: { // 这是啥？
			    myProp: 'bar'
			},
			domProps: {
			    innerHTML: 'baz'
			},
			on: {
				click: this.clickHandler
			},
	      },
	      this.$slots.default // 子节点数组
	    )

	    /**
	      *
	      *
		    createElement参数
		    createElement(
		    	html变签名/组件选项对象/function,
		    	与模板中属性对应的 数据对象,
		    	子虚拟节点{Stirng | Array}
		    )
		*/
	},
	methods: {
		clickHandler() {
			console.log('demo1 comp clicked!')
		}
	}
  }
</script>