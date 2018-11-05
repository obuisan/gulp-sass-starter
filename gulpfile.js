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
const runSequence = require('run-sequence');

require('dotenv').load();
const config = {
  inputPath: process.env.INPUT_PATH || './sass',
  outputPath: process.env.OUTPUT_PATH || './css',
  fixBrowsers: process.env.AUTOPREFIXER_BROWSERS || '>1%',
  fixGrid: process.env.AUTOPREFIXER_GRID || false,
  stylelint: process.env.SASS_LINT !== 'false'
};

if (!fs.existsSync(config.inputPath)) {
  console.log('Error: Input path ' + config.inputPath + ' doesn\'t exist.');
  process.exit(1);
}

sass.compiler = require('node-sass');
runSequence.options.showErrorStackTrace = false;
runSequence.options.ignoreUndefinedTasks = true;

gulp.task('sass:build', () => {
  let sassTask = (minify = false) => {
    return gulp.src(config.inputPath + '/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: ['./bower_components', './node_modules'],
        outputStyle: minify ? 'compressed' : 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: config.fixBrowsers,
        cascade: !minify,
        grid: config.fixGrid
      }))
      .pipe(gulpif(minify, rename({ suffix: '.min' })))
      .pipe(sourcemaps.write('.', { addComment: false }))
      .pipe(gulp.dest(config.outputPath));
  };
  sassTask();
  return sassTask(true);
});

gulp.task('sass:lint', (callback) => {
  if (config.stylelint) {
    return gulp
      .src(config.inputPath + '/**/*.scss')
      .pipe(stylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      }));
  }
  callback();
});

gulp.task('default', (callback) => runSequence('build', callback));

gulp.task('build', (callback) => {
  let sassLintTask = config.stylelint ? 'sass:lint' : null;
  runSequence(sassLintTask, 'sass:build', callback);
});

gulp.task('watch', ['sass:build'], () => {
  gulp.watch(config.inputPath + '/**/*.scss', ['sass:build']);
});
