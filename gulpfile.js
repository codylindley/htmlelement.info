var gulp = require('gulp');
var ftp = require('gulp-ftp');

var ftpConfig = require('./ftpConfigs');

console.log(ftpConfig);

gulp.task('goLive', function () {
    gulp.src('./src/**/*.*')
        .pipe(ftp(ftpConfig));
});





