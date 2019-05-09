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
    <el-tabs class="work-panel" v-model="activeTab">
      <el-tab-pane label="列表配置" name="list">
        <list-config :url.sync="url" :columns="columns"></list-config>
      </el-tab-pane>
      <el-tab-pane label="搜索条件配置" name="query">
        <query-config :queryConfig.sync="queryConfig"></query-config>
      </el-tab-pane>
    </el-tabs>

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
  import listConfig from './list'
  import queryConfig from './query/index'
  import useTable from '@/components/use/index'
  export default {
    name: "make",
    components: {
      listConfig,
      queryConfig,
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
        activeTab: 'query',

        url: '',
        columns: [],
        queryConfig: [],

        tableConfig: null,
        previewModelVisible: false,
        publishModelVisible: false
      }
    },
    methods: {
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

      // 发布
      publish() {
        console.log('queryConfig',this.columns,this.queryConfig)
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