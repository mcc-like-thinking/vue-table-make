<template>
  <div class="workspace">
    <div class="workspace-l">
      <div class="form-category">
        <h3 class="category-title">基础字段</h3>
        <draggable
          class="category-list"
          tag="ul"
          :list="basicComponents"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false">
          <li class="category skinborder-hover" v-for="(item,index) in basicComponents" :key="index">
            <i :class="item.icon"></i>
            <span class="name">{{item.name}}</span>
          </li>
        </draggable>
      </div>
    </div>
    <div class="workspace-center">
      <widget-form ref="widgetForm" v-bind="$attrs" v-on="$listeners" :select.sync="selectWidget"></widget-form>
    </div>
    <div class="workspace-r">
      <div class="form-category">
        <h3 class="category-title">字段属性</h3>
        <widget-config :data="selectWidget"></widget-config>
      </div>
    </div>
  </div>
</template>

<script>
  import { basicComponents } from './config'
  import draggable from 'vuedraggable'
  import widgetForm from './widgetForm'
  import widgetConfig from './widgetConfig'
  export default {
    name: "queryConfig",
    components: {
      draggable,
      widgetForm,
      widgetConfig
    },
    inheritAttrs: false,
    data() {
      return {
        basicComponents,
        selectWidget: {}
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/query.scss";
</style>