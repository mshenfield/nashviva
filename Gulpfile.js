var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

//Javascript concatenation
gulp.task('js', function() {
  gulp.src('./js/*.js')
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('public/js/'));
});

//livereload trigger
gulp.task('lr', function() {
  gulp.src('./public/**/*') 
    .pipe($.connect.reload());
});

//Default run server and watch js and public 
//directory for livereload
gulp.task('default', ['js'], function() {
  gulp.watch('js/*.js', ['js']);
  gulp.watch(['public/**/*'], ['lr']);
  $.connect.server({
    livereload : true,
    root : 'public',
    host : '*',
  });
});
