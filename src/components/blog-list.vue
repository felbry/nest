<style scoped>
    .blog-item {
        /* padding: 8px 0; */
        font-weight: bolder;
    }

    .date {
        font-size: 12px;
        width: 150px;
        color: #333;
        transition: color 1.6s;
    }

    .date:hover {
        color: #fff;
    }

    .title {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        height: 46px;
        font-size: 22px;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .title-avatar {
        margin-right: 8px;
        width: 30px;
        height: 30px;
        border: 2px solid #fff;
        border-radius: 30px;
    }

    .title-avatar:hover {
        transform: rotate(180deg);
    }

    .el-pagination {
        position: absolute;
        left: 60px;
        bottom: 40px;
    }
</style>

<template>
  <div>
    <div v-if="articalList.length">
      <div
        v-for="item in articalList"
        :key="item.id"
        class="blog-item">
        <div class="date">{{new Date(item.createdAt).toLocaleDateString()}} {{new Date(item.createdAt).toLocaleTimeString().slice(0, -3)}}</div>
        <div
          class="title"
          @click="detailBlog(item.id)">
          <img
            :src="item.avatarUrl"
            class="title-avatar">
          {{item.title}}
        </div>
      </div>
    </div>
    <div v-else>暂无相关文章</div>
    <el-pagination
      :current-page.sync="page"
      :total="total"
      background
      layout="prev, pager, next, total"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Pagination } from 'element-ui'

module.exports = {
  asyncData ({ store, route }) {
    return store.dispatch('getArticalList')
  },
  beforeRouteUpdate (to, from, next) {
    // 重置下分页状态
    this.$store.dispatch('getArticalList', {
      tid: to.params.tid === 'all' ? '' : to.params.tid,
      page: 1
    }).then(() => {
      next(vm => {
        vm.page = 1
      })
    })
  },
  data () {
    return {
      page: 1
    }
  },
  computed: mapState({
    articalList: state => state.blog.articalList,
    total: state => state.blog.total
  }),
  methods: {
    detailBlog (id) {
      this.$router.push(`/blog/articals/${id}`)
    },
    pageChange (page) {
      this.$store.dispatch('getArticalList', {
        tid: this.route.params.tid === 'all' ? '' : this.route.params.tid,
        page: page
      })
    }
  },
  components: {
    [Pagination.name]: Pagination
  }
}
</script>
