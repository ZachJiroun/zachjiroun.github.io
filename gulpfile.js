'use strict';

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------
gulp.task('compileSass', function() {
  return gulp.src("scss/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('scss/*.scss', ['compileSass'])
	gulp.watch(['index.html', 'img/**']).on('change', browserSync.reload);
});

// -----------------------------------------------------------------------------
// Build
// -----------------------------------------------------------------------------

gulp.task('build', ['clean', 'compileSass'], function() {
	return gulp.src(['index.html', 'css/main.css', 'img/**'], { base: './' })
		.pipe(gulp.dest('dist'));
});

// -----------------------------------------------------------------------------
// Clean
// -----------------------------------------------------------------------------

gulp.task('clean', function() {
	del(['dist', 'css/main.css*']);
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['clean', 'compileSass', 'watch']);