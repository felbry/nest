<style lang="scss" scoped>
// 代码风格
@import url("../css/atom-one-light.css");

@mixin h-universal {
  -webkit-margin-before: 0px;
  font-weight: bolder;
  margin-bottom: 24px;
}

.blog-body {
  padding: 8px;
  line-height: 30px;

  /deep/ h1 {
    @include h-universal;
    font-size: 40px;
    line-height: 40px;
    padding-bottom: 10px;
  }

  /deep/ h2 {
    @include h-universal;
    font-size: 32px;
    line-height: 32px;
    width: 90%;
    padding-bottom: 10px;
  }

  /deep/ h3 {
    @include h-universal;
    font-size: 28px;
    line-height: 28px;
    width: 80%;
    padding-bottom: 10px;
  }

  /deep/ h4 {
    @include h-universal;
    font-size: 24px;
    line-height: 24px;
  }

  /deep/ h5 {
    @include h-universal;
    font-size: 22px;
    line-height: 22px;
  }

  /deep/ p {
    -webkit-margin-before: 0px;
    margin-bottom: 24px;
  }

  /deep/ img {
    width: 100%;
    margin: 15px 0;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
  }

  /deep/ ul,
  /deep/ ol {
    margin: 0 0 24px 0;
    padding-left: 25px;
    background-color: #333;
    border-radius: 10px;
    opacity: 0.8;
    color: #fff;

    li {
      line-height: 28px;
      margin-bottom: 5px;

      p {
        margin-bottom: 0;
      }
    }
  }

  /deep/ ul {
    list-style-type: square;
  }

  /deep/ a {
    color: #61bfc1;
    font-weight: bold;
    cursor: alias;
    text-decoration: underline !important;
  }

  /deep/ blockquote {
    margin: 0 0 24px 0;
    padding: 20px;
    border: 1px dashed #b9d5ff;
    border-width: 1px 0;

    p {
      margin-bottom: 0;
    }
  }

  /deep/ code {
    display: inline-block;
    padding: 0 5px;
    background: pink;
    border-radius: 5px;
    margin: auto 3px;
    color: #111;
  }

  /deep/ pre {
    margin: 0 0 24px 0;
    padding: 24px;
    background-color: #333;
    opacity: 0.8;
    color: #fff;
    white-space: pre-wrap;
    border-radius: 10px;

    code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      line-height: 1.5;
      background: inherit;
      color: inherit;
    }
  }

  /deep/ table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin-bottom: 25px;

    tr {
      border: 1px solid #ddd;
      &:nth-child(even) {
        background: #f8f8f8;
      }
    }

    th {
      background: #999;
      color: #fff;
      text-transform: uppercase;
    }

    td {
      padding: 10px 15px;
    }
  }
}

@media only screen and (max-width: 1146px) {
  .artical-content, .footer-content {
    padding-right: 0 !important;
    max-width: 736px !important;
  }

  .toc-container {
    top: 0 !important;
    margin-left: 0 !important;
    padding-left: 0 !important;
    border: none !important;
    width: 0 !important;
    background: #000;
  }
}

.artical-content, .footer-content {
  margin: 30px auto 0;
  max-width: 736px + 350px + 60px;
  padding-right: 350px + 60px;
}

.footer-container {
  padding: 20px 15px;
  background: #f0f2fa;
}

.toc-container {
  position: fixed;
  width: 350px;
  height: 90vh;
  top: 5vh;
  bottom: 5vh;
  margin-left: 736px + 30px;
  border-left: 1px solid #eee;
  padding-left: 30px;
  overflow: auto;
  color: #333;
  ul {
    padding-left: 30px;
  }
  li {
    list-style: none;
  }
  .h1 {
    font-size: 16px;
    margin-bottom: 18px;
  }
  .h2,
  .h3 {
    font-size: 14px;
    margin: 6px 0;
  }
  .anchor:hover,
  .anchor-active {
    display: inline-flex;
    padding: 5px 0;
    background: #f3f3f3;
    color: #e58c7c;
  }
}

.artical-header {
  padding: 25px 0;
  margin-bottom: 25px;

  h2 {
    font-size: 48px;
  }
}

.artical-time {
  display: block;
  font-size: 20px;
}

.el-dialog__wrapper /deep/ .el-dialog__header {
  padding: 0px;
}

.el-dialog__wrapper /deep/ .el-dialog__body img {
  width: 100%;
}
.footer-img {
  text-align: center;
  margin-bottom: 24px;

  img {
    width: 280px;
    height: 280px;
  }
}
.comment-box {
  display: flex;
  img {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    margin-right: 30px;
  }
}
.comment-box-right {
  width: 100%;
  textarea {
    width: 100%;
    height: 100px;
    padding: 15px;
    background: #fcfcfc;
    border: none;
    border-radius: 4px;
    outline: none;
    resize: none;
  }
  input {
    width: 100%;
    height: 25px;
    margin-top: 12px;
    padding: 5px 10px;
    background: #fcfcfc;
    border: none;
    border-radius: 4px;
    outline: none;
  }
}
</style>

<template>
  <div>
    <div class="artical-content">
      <div class="artical-header">
        <h2>
          {{artical.title}}
          <small class="artical-time">{{new Date(artical.createdAt).toLocaleDateString()}} {{new Date(artical.createdAt).toLocaleTimeString()}}</small>
        </h2>
      </div>
      <div
        class="blog-body"
        v-html="artical.content">
      </div>
      <!-- 只有三层就不抽组件了 0.0 -->
      <ul
        v-if="artical.toc && artical.toc.length"
        class="toc-container">
        <li
          v-for="item in artical.toc"
          :key="item.anchor"
          class="h1">
          <a
            :class="{
              'anchor-active': item.anchor === currentAnchor
            }"
            :href="'#' + item.anchor"
            class="anchor">{{item.content}}</a>
          <ul
            v-if="item.children.length"
            v-show="item.anchor === currentFatherAnchor">
            <li
              v-for="itemH2 in item.children"
              :key="itemH2.anchor"
              class="h2">
              <a
                :class="{
                  'anchor-active': itemH2.anchor === currentAnchor
                }"
                :href="'#' + itemH2.anchor"
                class="anchor">{{itemH2.content}}</a>
              <ul v-if="itemH2.children && itemH2.children.length">
                <li
                  v-for="itemH3 in itemH2.children"
                  :key="itemH3.anchor"
                  class="h3">
                  <a
                    :class="{
                      'anchor-active': itemH3.anchor === currentAnchor
                    }"
                    :href="'#' + itemH3.anchor"
                    class="anchor">{{itemH3.content}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <el-dialog
        :visible.sync="isPreview"
        :append-to-body="true"
        :show-close="false"
        custom-class="blog-img-dialog">
        <img :src="previewUrl">
      </el-dialog>
      <div class="footer-img">
        <img
          v-if="artical.gender === 1"
          src="../imgs/felbry.jpg">
        <img
          v-else
          src="../imgs/jing.jpg">
      </div>
      <!-- <input type="text" v-model="email"> -->
      <!-- <button @click="registry">拿到验证码</button> -->
    </div>
    <!-- <div class="footer-container">
      <div class="footer-content">
        <div class="comment-box">
          <img src="https://pic2.zhimg.com/v2-1e02c1531c33f9460ae82eb88a999cdd_r.jpg" alt="">
          <div class="comment-box-right">
            <textarea></textarea>
            <input type="text">
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'element-ui'
import titleMixin from '../mixin/title'
import { POST_FRIEND_REGISTRY } from '../../api'

module.exports = {
  mixins: [titleMixin],
  title () {
    return `${this.artical.title} - ${this.artical.nickName}`
  },
  asyncData ({ store, route }) {
    return store.dispatch('getArtical', route.params.id)
  },
  mounted () {
    let imgs = document.querySelectorAll('.blog-body img')
    let as = document.querySelectorAll('.blog-body a')
    let that = this
    Array.from(imgs).forEach(img => {
      img.addEventListener('click', function (e) {
        that.previewUrl = e.target.src
        that.isPreview = true
      })
    })
    Array.from(as).forEach(a => {
      a.setAttribute('target', '_blank')
    })
    this.findActive()
    document.addEventListener('scroll', this.findActive)
  },
  data () {
    return {
      isPreview: false,
      previewUrl: '',
      email: '',
      headGroup: [],
      currentAnchor: '',
      currentFatherAnchor: ''
    }
  },
  computed: mapState({
    artical: state => state.blog.artical
  }),
  methods: {
    registry () {
      POST_FRIEND_REGISTRY({
        email: this.email
      }).then(data => {
        console.log(data)
      })
    },
    findActive () {
      // 先看有没有在 0 - 10之间的，有直接确定不走之后的逻辑。没有的话下一步
      // 如果一遍下来都没有，就找到最小的index，如果还有上一个index，就是上一个选中
      // 没有，则是当前最小的选中（即页面刚打开）
      this.artical.tocSort.some((tocItem, index) => {
        let arr = this.artical.tocSort
        let head = document.getElementById(tocItem.anchor)
        let top = head.getBoundingClientRect().top
        if (top < 0) {

        } else {
          let currentIndex = 0
          if (top <= 10) {
            this.currentAnchor = tocItem.anchor
            currentIndex = index
          } else {
            if (index === 0) {
              this.currentAnchor = tocItem.anchor
              currentIndex = index
            } else {
              this.currentAnchor = arr[index - 1].anchor
              currentIndex = index - 1
            }
          }
          // 找到顶级anchor，为了控制展开收缩
          let i = 0
          while (arr[currentIndex - i].level !== 1) {
            i++
          }
          this.currentFatherAnchor = arr[currentIndex - i].anchor
          return true
        }
      })
    }
  },
  components: {
    [Dialog.name]: Dialog
  }
}
</script>
