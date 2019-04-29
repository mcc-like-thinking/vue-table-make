<template>
  <div class="workspace">
    <div class="workspace-l">
      <div class="workspace-l-wrapper">
        <el-input class="serviceUrl-input" v-model="serverUrl" placeholder="请输入服务端地址（例如：/user/list）"></el-input>
        <draggable
          class="list-group"
          :list="columns"
          draggable=".item"
          group="people"
          ghostClass="ghost"
          :animation="100"
          @end="dragEnd">
          <div class="list-group-item item clearfix" :class="{active: curColumn.id == item.id}"
            v-for="(item,index) in columns"
            :key="item.key" @click="selectColumn(index)">
            {{ item.name }}
            <i class="el-icon-close fr" @click.stop="delRow(index)"></i>
          </div>
          <div
            slot="footer"
            class="btn-group list-group-item"
            role="group"
            key="footer">
            <el-button type="primary" icon="el-icon-plus" round size="small" @click="addRow">新增一列</el-button>
          </div>
        </draggable>
      </div>
    </div>
    <div class="workspace-r">
      <el-form class="config-form" :model="curColumn" :rules="rules" ref="configForm" label-position="top" v-if="curColumn !== null">
        <el-form-item label="表头名称" prop="name">
          <el-input v-model="curColumn.name" placeholder="请输入表头名称"></el-input>
        </el-form-item>
        <el-form-item label="字段值" prop="prop">
          <el-input v-model="curColumn.prop" placeholder="请输入字段值"></el-input>
        </el-form-item>
        <el-form-item label="列项宽度" prop="width">
          <el-input v-model.number="curColumn.width" placeholder="请输入列项宽度"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "listConfig",
    components: {
      draggable,
    },
    props: {
      url: {
        type: String,
        required: true
      },
      columns: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data() {
      var checkWidth = (rule, value, callback) => {
        if (value) {
          if (!Number.isInteger(value)) {
            callback(new Error('列项宽度必须为数字值'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        serverUrl: this.url,
        curColumn: null,
        rules: {
          name: [
            { required: true, message: '请输入表头名称', trigger: 'blur' }
          ],
          prop: [
            { required: true, message: '请输入字段值', trigger: 'blur' }
          ],
          width: [
            { validator: checkWidth, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      serverUrl: function(val) {
        this.$emit('update:url', val)
      }
    },
    created() {
      this.add()
    },
    methods: {
      add() {
        this.columns.push({
          id: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          name: 'row_' + Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          prop: 'key_' + Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          width: ''
        })

        if (this.curColumn === null) {
          this.curColumn = this.columns[0]
        }
      },
      addRow() {
        this.add()
      },
      delRow(idx) {
        const column = this.columns[idx]
        this.columns.splice(idx, 1)

        if (this.columns.length) {
          if (column.id === this.curColumn.id) {
            this.curColumn = this.columns[0]
          }
        } else {
          this.curColumn = null
        }
      },

      // 拖拽排序
      dragEnd(evt) {
        if (evt.oldIndex == this.curIndex) {
          this.curIndex = evt.newIndex;
        }
      },

      // 选择current row
      selectColumn(idx) {
        this.curColumn = this.columns[idx]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/list.scss";
</style>