const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const modify = require('gulp-modify');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
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
    'src/**/*.png',
  ],
};

const packages = {
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
  'moment': {
    main: 'min/moment.min.js',
    fix: {
      search: /d\[e\]instanceof Function/g,
      replace: 'typeof d\[e\] === \'function\'',
    },
  },
  'wechat-weapp-redux': {
    notBundle: true,
    addIndex: true,
    fix: {
      'connect.js': [
        {
          search: /({}, (pageConfig))/g,
          replace: '$2',
        },
        {
          search: /(handleChange.apply\(this\))/g,
          replace: 'handleChange.apply\(this, \[options\]\)',
        }
      ],
      'Provider.js': [{
        search: /({}, (appConfig))/g,
        replace: '$2',
      }],
    },
  },
};

// 依赖拷贝js
const copyJs = (file, base, dest) => {
  let fix;
  if (file.indexOf('node_modules') === 0) {
    let packageName = file.substr(13);
    packageName = packageName.substring(0, packageName.indexOf('/'));
    const package = packages[packageName];
    if (package && package.fix && !package.fix.search) {
      fix = package.fix[path.basename(file)];
    }
  }
  gulp.src(file, { base })
    .pipe(gulpif(fix !== undefined, modify({
      fileModifier: (file, contents) => {
        fix.forEach((it) => {
          contents = contents.replace(it.search, it.replace)
        });
        return contents;
      },
    })))
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .on('end', () => {
      fs.readFile(file, 'utf8', (err, contents) => {
        if (err) {
          console.error(err);
          return;
        }
        const matchs = contents.match(/(require\('.*'\))/g);
        if (!matchs) {
          return
        }
        matchs.forEach((fileName) => {
          let filePath = fileName.substring(9, fileName.length - 2);
          if (!filePath.match(/\.js/g)) {
            filePath = `${filePath}.js`;
          }
          const subfile = path.join(path.dirname(file), filePath);
          fs.exists(path.join(dest, filePath), (exists) => {
            if (!exists) {
              copyJs(subfile, base, dest);
            }
          });
        });
      });
    });
}

gulp.task('compile', () => {
  gulp.src(paths.scripts)
    .pipe(tsProject())
    .js.pipe(modify({
      // 文件修改，替换`require('bluebird')`为`require("../libs/bluebird")`
      fileModifier: (file, contents) => {
        const matchs = contents.match(/(require\("([^.].*)"\))/g);
        if (!matchs) {
          return contents;
        }
        let rPath = path.relative(file.path, './src');
        rPath = rPath.substring(0, rPath.length - 2);
        if (rPath.length === 0) {
          rPath = './';
        }
        matchs.forEach((packageName) => {
          packageName = packageName.substring(9, packageName.length - 2)
          const package = packages[packageName];
          if (package && package.addIndex) {
            contents = contents.replace(new RegExp(`(require\\("(${packageName})"\\))`, 'g'), 'require("$2/index")');
          }
        });
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
            .pipe(uglify())
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
            .pipe(uglify())
            .pipe(gulp.dest('dist/libs'));
        } else {
          // 拷贝所有js文件，主要是为了redux-observable需要rxjs
          readJson(path.join('node_modules', name, 'package.json'), (err, data) => {
            const file = path.join('node_modules', name, data.main);
            copyJs(file, path.dirname(file), path.join('dist', 'libs', name));
          });
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