const less = require('gulp-less');
const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cssentry = "./src/styles/*.less";
const htmlentry = './src/index.html';
// 开发环境
function buildcss(){
//   return watch(cssentry, { ignoreInitial:false }, function(){
    gulp.src(cssentry)
    .pipe(less({
        plugins: [autoprefix],
        paths: [ path.join(__dirname, 'src', 'includes') ]
    }))
    .pipe(gulp.dest('./dist'));
//   })
}
function buildhtml(){
    // return watch(htmlentry, { ignoreInitial:false }, function(){
      gulp.src(htmlentry)
      .pipe(gulp.dest('./dist'));
    // })
  }
watch([htmlentry, cssentry], function(){
    buildhtml();
    buildcss();
    console.log(111)
});
let build = gulp.parallel(buildhtml, buildcss);
gulp.task("default", build);
