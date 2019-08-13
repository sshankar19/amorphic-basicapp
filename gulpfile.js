var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConf = require('./webpack.config.js');
gulp.task('webpack', function() {
	return gulp
		.src('./apps/ticket/public/js/index.ts')
		.pipe(gulpWebpack(webpackConf, webpack))
		.pipe(gulp.dest('./apps/ticket/public/js/'));
});

gulp.task('webpack:watch', function() {
	return gulp
		.src('./apps/ticket/public/js/index.ts')
		.pipe(gulpWebpack(Object.assign({}, webpackConf, { watch: true }), webpack))
		.pipe(gulp.dest('./apps/ticket/public/js/'));
});
