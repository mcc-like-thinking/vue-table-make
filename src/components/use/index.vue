<template>
  <div class="use-container">
    <el-table :key="tableKey" :data="tableData.list" v-loading="tableData.loading" border fit>
      <el-table-column v-for="(column, index) in columns" :key="column.id" :label="column.name" :width="column.width">
        <template slot-scope="scope">
          {{scope.row[column.prop]}}
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix" style="padding: 15px 0;">
      <el-pagination class="fr" background layout="total, prev, pager, next" :total="tableData.total"
                     :current-page="query.pageNum"
                     @current-change="pageChangeClick"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { fetchUserList } from '@/api/index'
  export default {
    name: "useTable",
    components: {},
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
      return {
        tableKey: Date.now(),
        tableData: {
          loading: true,
          total: 0,
          list: []
        },
        query: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    watch: {
      columns: { // 对象、数组深度watch
        handler(val) {
          this.tableKey = Date.now()
        },
        deep: true
      },
    },
    created() {
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.tableData.loading = true
        fetchUserList(this.url, this.query).then(response => {
          this.tableData.list = response.data.list
          this.tableData.total = response.data.total

          setTimeout(() => {
            this.tableData.loading = false
          }, 1000)
        }).catch(() => {
          this.tableData.loading = false
        })
      },
      handleReset() {
        this.query.pageNum = 1
        this.getTableData()
      },
      pageChangeClick(page) {
        this.query.pageNum = page
        this.getTableData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>