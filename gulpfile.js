'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').init({
    server: {
        baseDir: './'
    }
});

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
});

gulp.task('browser-sync', function(){
    return browserSync.reload();
});

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./*.html', gulp.series('browser-sync'));
    gulp.watch('./js/*.js', gulp.series('browser-sync'));
});