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

配合VSCode与Gulp工具实时调用`tsc`编译ts源文件，其它文件通过gulp的watch进行拷贝。

- TODOS:
 [ ] 加入第三方库支持