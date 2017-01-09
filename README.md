# 使用TypeScript开发小程序

### 运行

使用微信web开发者工具新建一个小程序项目，项目目录选择`dist`目录，该目录是ts源文件编译后存放的目录。

### 开发

```bash
$ git clone git@github.com:linguofeng/wxapp-typescript.git
$ cd wxapp-typescript
$ npm install -g gulp typescript
$ yarn
$ code .
$ gulp watch
```

### 主要原理

通过Gulp工具调用`tsc`编译ts源文件，其它文件通过gulp的watch进行拷贝。

第三库是通过package.json文件描述，拷贝相关文件到dist/libs，并修改require引用的路径实现。

### TODOS:

[x] 加入第三方库支持
[x] 支持Redux
[x] 支持rxjs
[x] 支持moment
[x] 支持bluebird
[x] 支持redux-observable
