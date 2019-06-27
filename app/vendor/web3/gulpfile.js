#!/usr/bin/env node

'use strict';

var version = require('./lib/version.json');
var path = require('path');

var del = require('del');
var gulp = require('gulp');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
// var bower = require('bower');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');

var DEST = path.join(__dirname, 'dist/');
var src = 'index';
var dst = 'web3';
var lightDst = 'web3-light';

var browserifyOptions = {
  debug: true,
  insert_global_vars: false, // jshint ignore:line
  detectGlobals: true,
  bundleExternal: true,
};

function changeVersion(cb) {
  gulp
    .src(['./package.json'])
    .pipe(replace(/\"version\"\: \"([\.0-9]*)\"/, '"version": "' + version.version + '"'))
    .pipe(gulp.dest('./'));
  // gulp.src(['./bower.json'])
  //   .pipe(replace(/\"version\"\: \"([\.0-9]*)\"/, '"version": "'+ version.version + '"'))
  //   .pipe(gulp.dest('./'));
  gulp
    .src(['./package.js'])
    .pipe(replace(/version\: \'([\.0-9]*)\'/, "version: '" + version.version + "'"))
    .pipe(gulp.dest('./'));
  cb();
}

// gulp.task('bower', ['version'], function(cb){
//     bower.commands.install().on('end', function (installed){
//         console.log(installed);
//         cb();
//     });
// });

function lint() {
  return gulp
    .src(['./*.js', './lib/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

function clean(cb) {
  del([DEST]).then(cb.bind(null, null));
}

function light() {
  return browserify(browserifyOptions)
    .require('./' + src + '.js', { expose: 'web3' })
    .ignore('bignumber.js')
    .require('./lib/utils/browser-bn.js', { expose: 'bignumber.js' }) // fake bignumber.js
    .add('./' + src + '.js')
    .bundle()
    .pipe(exorcist(path.join(DEST, lightDst + '.js.map')))
    .pipe(source(lightDst + '.js'))
    .pipe(gulp.dest(DEST))
    .pipe(streamify(uglify()))
    .pipe(rename(lightDst + '.min.js'))
    .pipe(gulp.dest(DEST));
}

function standalone() {
  return browserify(browserifyOptions)
    .require('./' + src + '.js', { expose: 'web3' })
    .require('bignumber.js') // expose it to dapp users
    .add('./' + src + '.js')
    .ignore('crypto')
    .bundle()
    .pipe(exorcist(path.join(DEST, dst + '.js.map')))
    .pipe(source(dst + '.js'))
    .pipe(gulp.dest(DEST))
    .pipe(streamify(uglify()))
    .pipe(rename(dst + '.min.js'))
    .pipe(gulp.dest(DEST));
  // return browserify('./index.js')
  //     .bundle()
  //     .pipe(source('bundle.js'))
  //     .pipe(gulp.dest('./'));
}

// function watch() {
//     gulp.watch(['./lib/*.js'], ['lint', 'build']);
// }
// gulp.task('watch', function() {
//     gulp.watch(['./lib/*.js'], ['lint', 'build']);
// });

exports.version = changeVersion;
exports.lint = lint;
exports.clean = gulp.series(lint, clean);
exports.light = gulp.series(lint, clean, light);
exports.standalone = gulp.series(lint, clean, standalone);
// exports.watch = gulp.series(lint, build, watch);
exports.default = gulp.series(changeVersion, lint, clean, light, standalone);
