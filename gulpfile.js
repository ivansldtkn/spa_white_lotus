'use strict';

const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

sass.compiler = require('node-sass');

exports.sass = function () {
    return src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("main.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/css'));
};

exports.sassWatch = function () {
    watch('./src/sass/*.scss', series('sass'));
};