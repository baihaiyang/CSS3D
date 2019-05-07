const less = require('gulp-less');
const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cssentry = "./src/styles/*.less";
const htmlentry = './src/index.html';
// 开发环境
function devcss(){
  return watch(cssentry, { ignoreInitial:false }, function(){
    gulp.src(cssentry)
    .pipe(less({
        plugins: [autoprefix],
        paths: [ path.join(__dirname, 'src', 'includes') ]
    }))
    .pipe(gulp.dest('./dist'));
  })
}
function devhtml(){
  return watch(htmlentry, { ignoreInitial:false }, function(){
    gulp.src(htmlentry)
    .pipe(gulp.dest('./dist'));
  })
}
// 生产环境
function prodcss(){
  gulp.src(cssentry)
  .pipe(less({
      plugins: [autoprefix],
      paths: [ path.join(__dirname, 'src', 'includes') ]
  }))
  .pipe(gulp.dest('./dist'));
}
function prodhtml(){
  gulp.src(htmlentry)
  .pipe(gulp.dest('./dist'));
}
let build = gulp.parallel(devhtml, devcss);
if(process.env.NODE_ENV == 'production'){
  build = gulp.parallel(prodhtml, prodcss);
}
gulp.task("default", build);
