const less = require('gulp-less');
const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');
const watch = require('gulp-watch');
const LessAutoprefix = require('less-plugin-autoprefix');
const cleanCSS = require('gulp-clean-css');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cssentry = "./src/styles/*.less";
const htmlentry = './src/index.html';
const imgentry = './src/images/*.jpg';
// 开发环境
function devcss(){
  return watch(cssentry, { ignoreInitial:false }, function(){
    gulp.src(cssentry)
    .pipe(less({
        plugins: [autoprefix],
        paths: [ path.join(__dirname, 'src', 'includes') ]
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
  })
}
function devhtml(){
  return watch(htmlentry, { ignoreInitial:false }, function(){
    gulp.src(htmlentry)
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
  })
}
function devimg(){
  return watch(imgentry, { ignoreInitial:false }, function(){
    gulp.src(imgentry)
    .pipe(gulp.dest('./dist/images'))
    .pipe(connect.reload())
  })
}
// 生产环境
function prodcss(){
  gulp.src(cssentry)
  .pipe(less({
      plugins: [autoprefix],
      paths: [ path.join(__dirname, 'src', 'includes') ]
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist'));
}
function prodhtml(){
  gulp.src(htmlentry)
  .pipe(gulp.dest('./dist'));
}
function prodimg(){
  gulp.src(imgentry)
  .pipe(gulp.dest('./dist/images'));
}

function connectServer(){
  connect.server({
    root: 'dist',
    livereload: true
  })
}

let build = gulp.parallel(devhtml, devcss, devimg, connectServer);
if(process.env.NODE_ENV == 'production'){
  build = gulp.parallel(prodhtml, prodcss, prodimg);
}
gulp.task("default", build);




