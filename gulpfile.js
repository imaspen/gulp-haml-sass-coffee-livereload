var gulp = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    haml = require('gulp-haml'),
    sass = require('gulp-sass'),
    server = require('gulp-server-livereload');

var paths = {
  coffee: ['./coffee/**/*.coffee'],
  haml: ['./haml/**/*.haml'],
  sass: ['./sass/**/*.sass']
}

gulp.task('default', ['coffee', 'haml', 'sass', 'watch', 'webserver']);

gulp.task('build', ['coffee', 'haml', 'sass']);

gulp.task('coffee', function() {
  gulp.src(paths.coffee[0])
    .pipe(coffee())
    .pipe(gulp.dest('./www/js/'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('haml', function() {
  gulp.src(paths.haml[0])
    .pipe(haml())
    .pipe(gulp.dest('./www/'));
});

gulp.task('sass', function() {
  gulp.src('./sass/app.sass')
    .pipe(sass())
    .pipe(autoprefix({ browsers: ['> 1%'] }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('webserver', function() {
  gulp.src('./www')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.coffee[0], ['coffee']);
  gulp.watch(paths.haml[0], ['haml']);
  gulp.watch(paths.sass[0], ['sass']);
});
