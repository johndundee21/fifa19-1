const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');

const sassWatchersArray = ['./src/sass/**/*.scss'];
const sassWatchers = sassWatchersArray;
const BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('sass', function() {
  return gulp.src(sassWatchers)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(sassWatchers, ['sass']);
});

gulp.task('serve', ['sass', 'nodemon'], function() {
  browserSync.init({
    logLevel: "silent",
    logFileChanges: false,
    logPrefix: false,
    logConnections: true,
    logSnippet: false,
    proxy: 'http://localhost:3000',
    port: 4000,
    open: false
  });

  gulp.watch(sassWatchers, ['sass']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

// default start function
gulp.task('start', function() {
  console.log('Project is starting...');
  
  
});

// Default Task
gulp.task('default', ['serve']);
