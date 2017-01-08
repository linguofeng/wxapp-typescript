const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const modify = require('gulp-modify');
const rename = require("gulp-rename");
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

const packages = {
  '@reactivex/rxjs': {
    main: 'dist/global/Rx.js',
  },
};

const getEntryFilePath = (package) => {
  if (packages[package]) {
    return packages[package].main;
  }
  return null;
}

gulp.task('compile', () => {
  gulp.src(paths.scripts)
    .pipe(tsProject())
    .js.pipe(modify({
      // 文件修改，替换`require('bluebird')`为`require("../libs/bluebird")`
      fileModifier: (file, contents) => {
        if (!contents.match(/(require\("([^.].*)"\))/g)) {
          return contents;
        }
        let rPath = path.relative(file.path, './src');
        rPath = rPath.substring(0, rPath.length - 2);
        if (rPath.length === 0) {
          rPath = './';
        }
        return contents.replace(/(require\("([^.].*)"\))/g, `require("${rPath}libs/$2")`);
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
      let file = getEntryFilePath(name);
      if (!file) {
        readJson(path.join('node_modules', name, 'package.json'), (err, data) => {
          file = path.join('node_modules', name, data.browser || data.main);
          gulp.src(file, { base: path.dirname(file) })
            .pipe(gulp.dest('dist/libs'));
        });
      } else {
        file = path.join('node_modules', name, file);
        gulp.src(file, { base: path.dirname(file) })
          .pipe(rename(`${name}.js`))
          .pipe(gulp.dest('dist/libs'));
      }
    });
    // TODO 删除不存在的库
  });
});

gulp.task('watch', ['copyLibs', 'copyStatic', 'compile'], () => {
    gulp.watch('package.json', ['copyLibs']);
    gulp.watch(paths.statics, ['copyStatic']);
    gulp.watch(paths.scripts, ['compile']);
});