var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  cssImport = require('gulp-cssimport'),
  prefix = require('gulp-autoprefixer');

gulp
  .task('sass', function() {
    return gulp.src('./styles/main.sass')
      .pipe(plumber())
      .pipe(cssImport())
      .pipe(sass({'outputStyle': 'expanded'}))
      .pipe(prefix())
      .pipe(gulp.dest('./styles'));
  })

  .task('watch', ['sass'], function() {
    gulp.watch('./styles/**/*.sass', ['sass']);
  })

  .task('default', ['watch', 'sass']);
