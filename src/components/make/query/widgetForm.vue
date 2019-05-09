<template>
  <div class="form-container">
    <el-form class="widget-form" label-position="top">
      <draggable class="widget-form-list"
        v-model="list"
        v-bind="{group:'people', ghostClass: 'ghost'}"
        @add="addWidget">
        <template v-for="(item, index) in list">
          <el-form-item class="widget-view"
            :class="{active: selectWidget.key == item.key}"
            :label="item.name"
            @click.native.stop="selectingWidget(index)">

            <i class="el-icon-close" @click.stop="delWidget(index)"></i>

            <el-input v-if="item.type == 'input'"
              v-model="item.options.defaultValue"
              :style="{width: item.options.width}"
              :placeholder="item.options.placeholder">
            </el-input>

            <el-select v-if="item.type == 'select'"
              v-model="item.options.defaultValue"
              :placeholder="item.options.placeholder"
              :style="{width: item.options.width}">
              <el-option v-for="opt in item.options.options" :key="opt.value" :value="opt.value" :label="item.options.showLabel?opt.label:opt.value"></el-option>
            </el-select>

            <el-date-picker v-if="item.type == 'date'"
              v-model="item.options.defaultValue"
              :type="item.options.type"
              :value-format="item.options.format"
              :placeholder="item.options.placeholder"
              :start-placeholder="item.options.startPlaceholder"
              :end-placeholder="item.options.endPlaceholder"
              :style="{width: item.options.width}" @change="datepickerChange">
            </el-date-picker>

            <el-time-picker v-if="item.type == 'time'"
              is-range
              arrow-control
              v-model="item.options.defaultValue"
              :value-format="item.options.format"
              :placeholder="item.options.placeholder"
              :start-placeholder="item.options.startPlaceholder"
              :end-placeholder="item.options.endPlaceholder"
              :arrowControl="item.options.arrowControl"
              :style="{width: item.options.width}">
            </el-time-picker>
          </el-form-item>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "widgetForm",
    components: {
      draggable,
    },
    props: ['queryConfig','select'],
    data() {
      return {
        list: this.queryConfig,
        selectWidget: this.select
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
      selectingWidget(index) {
        this.selectWidget = this.list[index]
      },
      addWidget(evt) {
        const newIndex = evt.newIndex
        const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

        this.list.splice(newIndex, 1, {
          ...this.list[newIndex],
          options: {
            ...this.list[newIndex].options,
            remoteFunc: 'func_' + key
          },
          key,
          model: this.list[newIndex].type + '_' + key,
          rules: []
        })
        this.selectWidget = this.list[newIndex]
      },
      delWidget(index) {
        if (this.list.length - 1 === index) {
          if (index === 0) {
            this.selectWidget = {}
          } else {
            this.selectWidget = this.list[index - 1]
          }
        } else {
          this.selectWidget = this.list[index + 1]
        }

        this.$nextTick(() => {
          this.list.splice(index, 1)
        })
      },
      datepickerChange(v) {
        console.log('datepickerChange',v)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .widget-form-list {
    padding-bottom: 200px;
  }
  .widget-view {
    position: relative;
    margin: 0;
    padding: 5px 10px 18px;
    border-left: 5px solid transparent;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      display: block;
    }
  }
  .widget-view:hover {
    background-color: #ecf5ff;
    border-left-color: #ecf5ff;
  }
  .widget-view.active {
    border-left: 5px solid $blue;
    background-color: #b3d8ff;
  }
  .el-icon-close {
    position: absolute;
    top: -38px;
    right: 10px;
    z-index: 2;
    display: none;
    font-size: 18px;
    font-weight: bold;
    color: #888;
    cursor: pointer;
    transition: all 0.3 linear;
    &:hover {
      color: #000;
    }
  }
  .widget-view.active .el-icon-close {
    display: block;
  }
  .ghost {
    background-color: #fff !important;
    border: 1px dashed $blue;
  }
</style>