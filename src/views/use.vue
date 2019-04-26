<template>
  <div class="app-contanier">
    <use-table :url="url" :columns="columns" v-loading="loading" v-if="url"></use-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import useTable from '@/components/use/index'
  export default {
    name: "TableUse",
    components: {
      useTable
    },
    data() {
      return {
        loading: true,
        id: this.$route.params.tableId,
        url: '',
        columns: []
      }
    },
    computed: {
      ...mapGetters([
        'tableConfig'
      ])
    },
    created() {
      this.init()
      let that = this
    },
    methods: {
      init() {
        let that = this
        setTimeout(function(){
          const config = that.tableConfig.filter(item => item.id === that.id)[0]
          that.url = config.url
          that.columns  = config.columns
          that.loading = false
        },200)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>