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
    font-size: 48px;
    line-height: 48px;
    padding-bottom: 10px;
  }

  /deep/ h2 {
    @include h-universal;
    font-size: 38px;
    line-height: 38px;
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
    font-size: 25px;
    line-height: 25px;
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
    }
  }
}

@media only screen and (max-width: 1057px) {
    .artical-content {
      padding-right: 0!important;
      max-width: 736px!important;
    }

    .toc-container {
      top: 0!important;
      margin-left: 0!important;
      width: 0!important;
      background: #000;
    }
}

.artical-content {
  margin: 30px auto 0;
  max-width: 736px + 350px;
  padding-right: 350px;
}

.toc-container {
  position: fixed;
  width: 350px;
  height: 100%;
  top: 60px;
  margin-left: 736px + 20px;
  padding: 20px;
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
  .h2, .h3 {
    font-size: 12px;
    margin: 6px 0;
  }
  .anchor {
    // border-left: 3px solid #ff9800;
    &:before {
      content: '✔';
    }
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
</style>

<template>
    <div class="artical-content">
      <div class="artical-header">
        <h2>
          {{artical.title}}
          <small class="artical-time">{{new Date(artical.createdAt).toLocaleDateString()}} {{new Date(artical.createdAt).toLocaleTimeString()}}</small>
        </h2>
      </div>
      <div
          @click="test"
          v-html="artical.content"
          class="blog-body">
      </div>
      <!-- 只有三层就不抽组件了 0.0 -->
      <ul class="toc-container">
        <li
          class="h1"
          v-for="item in artical.toc">
          <a
            class="anchor"
            :href="'#' + item.anchor">{{item.content}}</a>
          <ul v-if="item.children.length">
            <li
              class="h2"
              v-for="itemH2 in item.children">
              <a
                class="anchor"
                :href="'#' + itemH2.anchor">{{itemH2.content}}</a>
              <ul v-if="itemH2.children && itemH2.children.length">
                <li
                  class="h3"
                  v-for="itemH3 in itemH2.children">
                  <a
                    class="anchor"
                    :href="'#' + itemH3.anchor">{{itemH3.content}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <el-dialog
        :visible.sync="isPreview"
        custom-class="blog-img-dialog"
        :append-to-body="true"
        :show-close="false">
        <img :src="previewUrl" />
      </el-dialog>
      <!-- <input type="text" v-model="email"> -->
      <!-- <button @click="registry">拿到验证码</button> -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "element-ui";
import { POST_FRIEND_REGISTRY } from "../../api";

module.exports = {
  asyncData({ store, route }) {
    return store.dispatch("getArtical", route.params.id);
  },
  mounted() {
    let imgs = document.querySelectorAll(".artical-content img");
    let that = this;
    Array.from(imgs).forEach(img => {
      img.addEventListener("click", function(e) {
        that.previewUrl = e.target.src;
        that.isPreview = true;
      });
    });

    let h1s = document.querySelectorAll('.blog-body h1');
    // let h2s = document.querySelectorAll('.blog-body h2');
    // let h3s = document.querySelectorAll('.blog-body h3');
    // console.log(h1s)
    // console.log(h2s)
    // console.log(h3s)
    Array.from(h1s).forEach(item => {
      this.headGroup.push(item);
    });
    // Array.from(h2s).forEach(item => {
    //   this.headGroup.push(item);
    // });
    // Array.from(h3s).forEach(item => {
    //   this.headGroup.push(item);
    // });
    // this.headGroup.concat(Array.from(h1s), Array.from(h2s), Array.from(h3s));
  },
  data() {
    return {
      isPreview: false,
      previewUrl: "",
      email: "",
      headGroup: []
    };
  },
  computed: mapState({
    artical: state => state.blog.artical
  }),
  methods: {
    registry() {
      POST_FRIEND_REGISTRY({
        email: this.email
      }).then(data => {
        console.log(data);
      });
    },
    test () {
      // 先看有没有在 0 - 15之间的，有直接确定不走之后的逻辑。没有的话如果大于0就保存值以及此dom的index
      // 如果一遍下来都没有，就找到最小的index，如果还有上一个index，就是上一个选中
      // 没有，则是当前最小的选中（即页面刚打开）
      // this.headGroup.forEach(head => {
      //   console.log(head.innerHTML);
      //   console.log(head.getAttribute('id'));
      //   console.log(head.getBoundingClientRect().top);
      // });
    }
  },
  components: {
    [Dialog.name]: Dialog
  }
};
</script>

