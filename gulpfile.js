/* 进入项目目录：cd d:\myweb\gulp-project */

// 引入 gulp
var gulp = require('gulp');
 
// 引入组件 
var htmlmin = require('gulp-htmlmin'),  //html压缩
    sass = require('gulp-ruby-sass'),   //cass预处理
    imagemin = require('gulp-imagemin'),  //图片压缩
    minifycss = require('gulp-minify-css'),  //css压缩
    jshint = require('gulp-jshint'),  //js检测
    uglify = require('gulp-uglify'),  //js压缩
    concat = require('gulp-concat'),  //文件合并
    rename = require('gulp-rename'),  //文件更名
    notify = require('gulp-notify');  //提示信息
    autoprefixer = require('gulp-autoprefixer'),  //css前缀
    //clean = require('gulp-clean'),   //清理文件
    //livereload = require('gulp-livereload');  //页面自动刷新

// 压缩html
gulp.task('html', function() {
  return gulp.src('dest/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'html task complete' }));
 
});

// 压缩图片
gulp.task('img', function() {  
  return gulp.src('dest/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'img task complete' }));
});


//合并、压缩、重命名css
gulp.task('css', function() {  
  return gulp.src('dest/css/*.css')
    
    /*sass预处理
    gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    */
    
    /*合并为main.css一个文件
    .pipe(concat('main.css'))
    */

    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'css task complete' }));
});


// 检查js
gulp.task('lint', function() {
  return gulp.src('dest/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task complete' }));
});
 
// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src('dest/js/*.js')
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'js task complete' }));
});


// 默认任务
gulp.task('default', function(){
    gulp.run('img', 'css', 'lint', 'js', 'html'); 
    // 监听html文件变化
    gulp.watch('dest/*.html', function(){
      gulp.run('html');
    });
    // 监听 css 文件
    gulp.watch('dest/css/*.css', ['css']);
    // 监听 js 文件
    gulp.watch('dest/js/*.js', ['lint', 'js']);
    // 监听 image 文件
    gulp.watch('dest/images/*', ['img']);
});
