<style lang="scss" scoped>
// 代码风格
@import url("~@/assets/css/atom-one-light.css");

@mixin h-universal {
  -webkit-margin-before: 0px;
  font-weight: bolder;
  margin-bottom: 24px;
}

.blog-body {
  padding: 8px;
  line-height: 30px;
  color: #555;

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
    border-color: rgb(85, 85, 85);
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
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
    color: #dfa612;
    transition: all .2s;
    cursor: alias;
    font-size: 18px;
    text-decoration: underline !important;
    text-decoration-color: rgba(236, 198, 48, 0.3);

    &:hover {
      color: #efbb35;
    }
  }

  /deep/ blockquote {
    margin: 0 0 24px 0;
    padding: 15px 18px;
    border-left: 4px solid rgba(236, 198, 48, 0.5);
    color: #84613d;
    background: rgba(255, 213, 70, .1);

    p {
      margin-bottom: 0;
    }
  }

  /deep/ code {
    display: inline-block;
    padding: 5px 7px 0;
    background: rgba(236, 198, 48, 0.1);
    border-bottom: 2px solid rgba(236, 198, 48, 0.3);
    margin: auto 3px;
    font-family: Consolas, Monaco, Andale Mono, monospace;
  }

  /deep/ pre {
    margin: 0 0 24px 0;
    padding: 24px;
    background-color: #fcfcfc;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.05);
    white-space: pre-wrap;
    border-radius: 3px;
    font-weight: 600;
    font-size: 18px;

    code {
      line-height: 2;
      background: inherit;
      color: inherit;
      border-bottom: none;
      padding: 0;
      margin: 0;
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
  /deep/ .footnotes-sep {
    border: none;
    line-height: 50px;
    font-size: 30px;
    &::after {
      content: '参考文章'
    }
  }
  /deep/ .footnotes-list {
    background-color: inherit;
    color: #000;
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
  <div style="height: 100%; overflow: scroll;">
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
          src="../assets/imgs/felbry.jpg">
        <img
          v-else
          src="../assets/imgs/jing.jpg">
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

export default {
  components: {
    [Dialog.name]: Dialog
  },
  mixins: [titleMixin],
  title () {
    return `${this.artical.title} - ${this.artical.nickName}`
  },
  asyncData ({ store, route }) {
    return store.dispatch('getArtical', route.params.id)
  },
  data () {
    return {
      isPreview: false,
      previewUrl: '',
      email: ''
    }
  },
  computed: mapState({
    artical: state => state.blog.artical
  }),
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
      if (/footnote-/.test(a.getAttribute('class')) || /footnote-/.test(a.parentNode.getAttribute('class'))) return
      a.setAttribute('target', '_blank')
    })
  },
  methods: {
    registry () {
      POST_FRIEND_REGISTRY({
        email: this.email
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>
