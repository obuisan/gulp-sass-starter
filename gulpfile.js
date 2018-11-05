'use strict';
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const stylelint = require('gulp-stylelint');

require('dotenv').load();
const inputPath = process.env.INPUT_PATH || './sass';
const outputPath = process.env.OUTPUT_PATH || './css';
const fixBrowsers = process.env.AUTOPREFIXER_BROWSERS || '>1%';
const fixGrid = process.env.AUTOPREFIXER_GRID || false;

if (!fs.existsSync(inputPath)) {
  console.error('Error: Input path '+ inputPath +' doesn\'t exist.');
  process.exit(1);
}

sass.compiler = require('node-sass');

gulp.task('sass:build', () => {
  let sassTask = (minify = false) => {
    return gulp.src(inputPath+'/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: ['./bower_components', './node_modules'],
        outputStyle: minify ? 'compressed' : 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: fixBrowsers,
        cascade: !minify,
        grid: fixGrid
      }))
      .pipe(gulpif(minify, rename({suffix: '.min'})))
      .pipe(sourcemaps.write('.', {addComment: false}))
      .pipe(gulp.dest(outputPath));
  };
  sassTask();
  return sassTask(true);
});

gulp.task('sass:lint', () => {
  return gulp
    .src(inputPath+'/**/*.scss')
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

gulp.task('default', ['build']);

gulp.task('build', ['sass:lint'], () => {
  gulp.start('sass:build');
});

gulp.task('watch', ['sass:build'], () => {
  gulp.watch(inputPath+'/**/*.scss', ['sass:build']);
});
