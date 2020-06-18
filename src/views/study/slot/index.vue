<template>
	<div class="app-container">
		<h5>demo1</h5>
		<comp1 url="/jsx">
			<span class="fa fa-user"></span>
            My name is {{name}}

            <template slot="footer">
			    <p>这是具名插槽的调用（2.x）</p>
			</template>
            <template v-slot:footer>
			    <p>这是具名插槽的调用（3.x）</p>
			</template>

			<!-- <div class="el-select-dropdown__empty flex alignC flexC">
              无匹配数据，请根据需要<el-button type="text" @click="SourceLayerShow">添加</el-button>
            </div>
            <template slot="empty">
		      <slot></slot>
		    </template> -->
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


        <br>
		<h5>demo4</h5>
		<h5>slot 与 slot-scope demo</h5>
		<p>tree-select组件的引用</p>
		<tree-select
	        :props="{
	          children: 'children',
	          label: 'funName'
	        }" v-model="form.pid">
	        <el-button size="medium" slot-scope="scope">
	          <template v-if="scope.node">{{scope.node.funName}}</template>
	          <template v-else>未选择或未匹配</template>
	        </el-button>
	    </tree-select>
	    <p>tree-select组件的定义 node: {id: 1, funName: 'node name'}</p>
		<el-popover
		    class="help-popover"
		    :width="240"
		    :placement="placement"
		    :open-delay="200"
		    trigger="click">
		    <div class="content">
		      <el-tree
		        ref="tree"
		        node-key="id"
		        :props="props"
		        :data="data"
		        :highlight-current="true"
		        :expand-on-click-node="false"
		        :default-expand-all="false"
		        :default-expanded-keys="defaultExpandedkeys"
		        :current-node-key="value"
		        @node-click="nodeClick">
		      </el-tree>
		    </div>
		    <template slot="reference">
		      <slot :node="node"></slot>
		    </template>
		</el-popover>
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