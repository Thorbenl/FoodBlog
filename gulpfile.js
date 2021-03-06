var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var shell = require('gulp-shell')
var bs = require('browser-sync').create();


var paths = {
    'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
    'style': {
        all: './public/styles/**/*.scss',
        output: './public/styles/'
    }
};

// gulp lint
gulp.task('lint', function(){
    gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
    gulp.src(paths.src)
        .pipe(watch(paths.src))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));
});

gulp.task('sass', function(){
    gulp.src(paths.style.all)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.output))
    .pipe(bs.stream());
});

gulp.task('watch:sass', function () {
    gulp.watch(paths.style.all, ['sass']);
});

gulp.task('browser-sync', function(){
  bs.init({
    proxy: 'http://localhost:3000',
    port: '4000'
  });
});

gulp.task('runKeystone', shell.task('node keystone'));

gulp.task('watch', ['watch:sass', 'watch:lint']);
gulp.task('default', ['watch', 'runKeystone', 'browser-sync']);
