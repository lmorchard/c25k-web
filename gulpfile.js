var _ = require('lodash');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var path = require('path');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');
var babelify = require("babelify");
var transform = require('vinyl-transform');
var tap = require('gulp-tap');

gulp.task('build', [
  'stylus', 'markup', 'browserify-app'
]);

var browserified = function () {
  return transform(function(filename) {
    var opts = {
      entries: [filename],
      debug: true
    };
    return browserify(opts)
      .transform(babelify)
      .bundle();
  });
};

gulp.task('browserify-app', function () {
  return gulp.src('./src/index.js')
    .pipe(browserified())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('stylus', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('markup', function () {
  return gulp.src('./src/**/*.html')
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
