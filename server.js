const express = require('express');
const app = express();

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackconfig = require('./webpack.dev');
const compiler = webpack(webpackconfig);

// gulp sass watch setup
const sassWatchersArray = ['./src/sass/**/*.scss'];
const sassWatchers = sassWatchersArray;

// gulp.task('sass', function () {
//   return gulp.src(sassWatchers)
//     .pipe(sourcemaps.init())
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(sourcemaps.write('./maps'))
//     .pipe(gulp.dest('./src/css'))
//     .pipe(browserSync.stream());
// });
//
// gulp.watch(sassWatchers, ['sass']);

// webpack setup
app.use(require("webpack-hot-middleware")(compiler));
app.use(middleware(compiler, {
  publicPath: '/',
  serverSideRender: true,
  log: false,
  reload: true,
  port: 4000
}));

// express listen to server(lunch)
app.use(express.static(__dirname + '/src'));

app.listen(3000, 'localhost');
app.on('listening', function () {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});