const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const modify = require('gulp-modify');
const readJson = require('read-package-json');

const tsProject = ts.createProject('tsconfig.json');

const paths = {
  scripts: [
    'typings/index.d.ts',
    'src/**/*.ts',
  ],
  statics: [
    'src/**/*.json',
    'src/**/*.wxml',
    'src/**/*.wxss',
  ],
};

gulp.task('compile', () => {
  gulp.src(paths.scripts)
    .pipe(tsProject())
    .js.pipe(modify({
      // 文件修改，替换`require('bluebird')`为`require("../libs/bluebird")`
      fileModifier: (file, contents) => {
        if (!contents.match(/require\("(\w+)"\)/g)) {
          return contents;
        }
        let rPath = path.relative(file.path, './src');
        rPath = rPath.substring(0, rPath.length - 2);
        if (rPath.length === 0) {
          rPath = './';
        }
        return contents.replace(/require\("(\w+)"\)/g, `require("${rPath}libs/$1")`);
      },
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copyStatic', () => {
  gulp.src(paths.statics)
    .pipe(gulp.dest('dist'));
});

// 复制package.json中的依赖库到dist/libs
gulp.task('copyLibs', () => {
  readJson('package.json', (err, { dependencies }) => {
    Object.keys(dependencies).forEach((name) => {
      readJson(`node_modules/${name}/package.json`, (err, data) => {
        const file = path.join('node_modules', name, data.browser || data.main);
        gulp.src(file, { base: path.dirname(file) })
          .pipe(gulp.dest('dist/libs'));
      });
    });
    // TODO 删除不存在的库
  });
});

gulp.task('watch', ['copyLibs', 'copyStatic', 'compile'], () => {
    gulp.watch('package.json', ['copyLibs']);
    gulp.watch(paths.statics, ['copyStatic']);
    gulp.watch(paths.scripts, ['compile']);
});