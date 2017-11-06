# change log

## 1. 实现demo
按照官网完成“显示访问url”功能

### package update list
- **A** koa
- **A** koa-router
- **A** vue
- **A** vue-server-renderer

## 2. 抽象
- 增加了模板文件
- 增加了工厂函数`createApp`避免状态单例

## 3. 搭建开发环境
配置了开发环境，加入进了router

### package update list
- **A** vue-router

## 4. 配置构建
编写‘生成用于生产环境’的配置
（目前还没完善好，构建之后还有问题）

### package update list
- **A** webpack
- **A** webpack-merge
- **A** webpack-node-externals
- **A** vue-loader
- **A** vue-style-loader
- **A** vue-template-compiler
- **A** url-loader
- **A** css-loader
- **A** extract-text-webpack-plugin
- **A** babel-loader
- **A** babel-core
- **A** babel-preset-env
- **A** babel-plugin-syntax-dynamic-import (动态路由，还需要在babel中配置插件)