// For best performance, don't add Sass partials to `gulp.src`

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var sassWatchersArray = ['./app/sass/**/*.scss'];
var sassWatchersDefault = ['./app/sass/style.compile.scss', './app/sass/libreries.compile.scss'];
var sassWatchers = sassWatchersArray;

gulp.task('sass', function() {
  return gulp.src(sassWatchers)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(sassWatchers, ['sass']);
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './app',
    logLevel: "silent",
    logFileChanges: false,
    logPrefix: false,
    logConnections: true,
    logSnippet: false
  });

  gulp.watch(sassWatchers, ['sass']);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
});

// default start function
gulp.task('start', function() {
  console.log('Project is starting...');
});

// Default Task
gulp.task('default', ['serve']);
