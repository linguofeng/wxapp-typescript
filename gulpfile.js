const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const modify = require('gulp-modify');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
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
  'redux': {
    main: 'dist/redux.js',
    fix: {
      search: /function\(global\)/g,
      replace: 'function()',
    },
  },
  'redux-logger': {
    main: 'dist/index.js',
  },
  'ramda': {
    main: 'dist/ramda.js',
  },
  'redux-observable': {
    main: 'dist/redux-observable.js',
  },
  'rxjs': {
    notBundle: true,
  },
};

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
      const package = packages[name];
      if (!package) {
        readJson(path.join('node_modules', name, 'package.json'), (err, data) => {
          const file = path.join('node_modules', name, data.browser || data.main);
          gulp.src(file, { base: path.dirname(file) })
            .pipe(gulp.dest('dist/libs'));
        });
      } else {
        if (!package.notBundle) {
          const file = path.join('node_modules', name, package.main);
          gulp.src(file, { base: path.dirname(file) })
            .pipe(gulpif(package.fix, modify({
              fileModifier: (file, contents) => {
                return contents.replace(package.fix.search, package.fix.replace);
              },
            })))
            .pipe(rename(`${name}.js`))
            .pipe(gulp.dest('dist/libs'));
        } else {
          // 拷贝所有js文件，主要是为了redux-observable需要rxjs
          gulp.src([
            path.join('node_modules', name, '**', '*.js'),
            `!${path.join('node_modules', name, 'bundles', '*.js')}`,
            `!${path.join('node_modules', name, 'src', '*.js')}`,
          ], { base: path.join('node_modules') }).pipe(gulp.dest('dist/libs'));
          // fs.readFile(file, 'utf8', (err, contents) => {
          //   const matchs = contents.match(/(require\('.*'\))/g);
          //   matchs.forEach((fileName) => {
          //     const filePath = fileName.substring(11, fileName.length - 2);
          //     const file = path.join('node_modules', name, `${filePath}.js`);
          //     gulp.src(file, { base: path.dirname(file) })
          //       .pipe(rename(`${filePath}.js`))
          //       .pipe(gulp.dest(path.join('dist/libs', name)));
          //     });
          // });
        }
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