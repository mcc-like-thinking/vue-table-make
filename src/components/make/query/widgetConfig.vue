<template>
  <div class="config-container" v-if="show">
    <el-form label-position="top">
      <el-form-item label="标题">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="占位内容" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="字段值">
        <el-input v-model="data.model"></el-input>
      </el-form-item>

      <!-- 下拉选择框相关 -->
      <el-form-item label="是否可搜索" v-if="data.type=='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch v-model="data.options.showLabel"></el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style="" v-model="data.options.remoteFunc">
              <template slot="prepend">远端方法</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <el-radio-group v-model="data.options.defaultValue" style="display: block;">
            <draggable class="select-opt-list" tag="ul" :list="data.options.options" 
              v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              handle=".drag-item">
              <li class="opt-item" v-for="(item, index) in data.options.options" :key="index">
                <el-radio
                  :label="item.value" 
                  style="margin-right: 5px;">
                  <el-input size="mini" v-model="item.value" placeholder="值" style="display: block;margin-bottom: 5px;"></el-input>
                  <el-input size="mini" v-model="item.label" placeholder="标签" style="display: block;" v-if="data.options.showLabel"></el-input>
                </el-radio>
                <div class="handler-group">
                  <el-button circle plain type="primary" size="mini" icon="el-icon-rank" class="drag-item"></el-button>
                  <el-button circle plain type="danger" size="mini" icon="el-icon-minus" @click="delOption(index)"></el-button>
                </div>
              </li>
            </draggable>
          </el-radio-group>
          <div style="margin-left: 20px;">
            <el-button type="text" @click="addOption">添加选项</el-button>
          </div>
        </template>
      </el-form-item>

      
    </el-form>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "widgetConfig",
    components: {
      draggable,
    },
    props: ['data'],
    data() {
      return {
        idx: 3,
      }
    },
    computed: {
      show () {
        if (this.data && Object.keys(this.data).length > 0) {
          console.log('widgetconfig-show',this.data)
          return true
        }
        return false
      }
    },
    watch: {
      list: {
        handler (val) {
          this.$emit('update:queryConfig', val)
        },
        deep: true
      },
      selectWidget: {
        handler (val) {
          this.$emit('update:select', val)
        },
        deep: true
      }
    },
    methods: {
      delOption(index) {
        this.data.options.options.splice(index, 1)
      },
      addOption() {
        this.idx += 1
        if (this.data.options.showLabel) {
          this.data.options.options.push({
            value: '新选项' + this.idx,
            label: '新选项' + this.idx
          })
        } else {
          this.data.options.options.push({
            value: '新选项' + this.idx
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .config-container /deep/ .el-form--label-top .el-form-item__label {
    padding-bottom: 0;
  }
  .config-container /deep/ .el-form-item {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: solid 1px #e1e1e1;
  }
  .select-opt-list .opt-item {
    position: relative;
    padding: 5px 0;
  }
  .select-opt-list /deep/ .el-radio__input {
    float: left;
    margin-left: 3px;
    line-height: 2;
  }
  .select-opt-list /deep/ .el-radio__label {
    display: block;
    padding-left: 25px;
  }
  .select-opt-list .handler-group {
    position: absolute;
    top: 6px;
    right: 0;
  }
  .select-opt-list /deep/ .el-button {
    margin: 0 5px;
    padding: 5px;
  }
  .ghost {
    background-color: #fff !important;
    border: 1px dashed $blue;
  }
</style>