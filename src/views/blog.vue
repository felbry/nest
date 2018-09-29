<style scoped>
.blog-container {
  margin: 50px auto 0;
  max-width: 990px;
}
.recent-posts {
  max-width: 630px;
}
.h2 {
  padding: 8px 0;
  font-size: 22px;
  font-weight: 400;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 15px;
}
.li {
  margin-bottom: 5px;
  list-style: circle;
  line-height: 28px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  color: #4a75b5;
}
.title:hover {
  color: #e58c7c;
  text-decoration: underline;
  cursor: pointer;
}
</style>

<template>
  <div class="blog-container">
    <div class="recent-posts">
      <h2 class="h2">近期文章</h2>
      <ul>
        <li
          v-for="item in articalList"
          :key="item.id"
          class="li">
          {{new Date(item.createdAt).toISOString().slice(0, 10)}} »
          <span
            class="title"
            @click="detailBlog(item.id)">
            {{item.title}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

module.exports = {
  asyncData ({ store, route }) {
    // return store.dispatch('getTagList');
    return store.dispatch('getArticalList')
  },
  data () {
    return {
      // url: ''
    }
  },
  computed: mapState({
    // tagList: state => state.blog.tagList
    articalList: state => state.blog.articalList,
    total: state => state.blog.total
  }),
  methods: {
    detailBlog (id) {
      this.$router.push(`/blog/articals/${id}`)
    }
  }
}
</script>
