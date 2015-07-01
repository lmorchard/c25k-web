var _ = require('lodash');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var path = require('path');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var deploy = require('gulp-gh-pages');
var babelify = require("babelify");
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var tap = require('gulp-tap');

gulp.task('build', [
  'stylus', 'assets', 'browserify-app'
]);

gulp.task('browserify-app', function () {
  return browserify({ entries: ['./src/index.js'], debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('stylus', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('assets', function () {
  return gulp.src(['src/manifest.webapp', './src/**/*.html'])
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3001
  });
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('deploy', function () {
  gulp.src('./dist/**/*')
    .pipe(deploy({}));
});

gulp.task('server', ['build', 'connect', 'watch']);

gulp.task('default', ['server']);
