<template>
  <div class="make-form skin-blue" :style="{ width: width, height: height}">
    <div class="header">
      <ul class="head-nav">
        <li class="nav-item">
          <a class="nbtn preview skincolor" href="javascript:;" @click="preview">预览</a>
        </li>
        <li class="nav-item">
          <a class="nbtn publish skinbg" href="javascript:;" @click="publish">发布</a>
        </li>
      </ul>
    </div>

    <!-- 配置空间 -->
    <div class="workspace">
      <div class="workspace-l">
        <div class="workspace-l-wrapper">
          <el-input class="serviceUrl-input" v-model="url" placeholder="请输入服务端地址（例如：/user/list）"></el-input>
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

    <!-- 预览弹窗 -->
    <el-dialog class="preview-model" title="预览" :visible.sync="previewModelVisible" @close="closePreview" width="80%">
      <div class="model-body">
        <use-table :url="url" :columns="columns" ref="useTable"></use-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewModelVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发布成功提示弹窗 -->
    <el-dialog class="publish-model" title="提示" width="30%" :visible.sync="publishModelVisible">
      <div class="model-body">
        <h3>恭喜您成功创建了一个列表页</h3>
        <router-link :to="{ name: 'table', params: {tableId: tableConfig.id} }" v-if="publishModelVisible">
          <el-button type="primary" round>点击查看</el-button>
        </router-link>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import useTable from '@/components/use/index'
  export default {
    name: "make",
    components: {
      draggable,
      useTable
    },
    props: {
      width: {
        type: String,
        default: '1200px'
      },
      height: {
        type: String,
        default: '100%'
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
        url: '',
        columns: [],
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
        },

        tableConfig: null,
        previewModelVisible: false,
        publishModelVisible: false
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
      },

      // 打开预览弹窗
      preview() {
        if (this.url) {
          this.previewModelVisible = true
        } else {
          this.$message.error('请输入服务端地址')
        }
      },
      // 关闭预览弹窗
      closePreview() {
        this.$refs.useTable.handleReset()
      },

      publish() {
        if (this.url) {
          this.tableConfig = {
            id: Date.parse(new Date()),
            url: this.url,
            columns: this.columns
          }
          this.$store.dispatch('ChangeTableConfig', this.tableConfig)
          this.publishModelVisible = true
        } else {
          this.$message.error('请输入服务端地址')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/make.scss";
</style>