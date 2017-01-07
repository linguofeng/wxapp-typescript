const gulp = require('gulp');
const ts = require('gulp-typescript');
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

gulp.task('compile', function() {
  gulp.src(paths.scripts)
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
});

gulp.task('copyStatic', function() {
  gulp.src(paths.statics)
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['compile', 'copyStatic'], function() {
    gulp.watch(paths.scripts, ['compile']);
    gulp.watch(paths.statics, ['copyStatic']);
});