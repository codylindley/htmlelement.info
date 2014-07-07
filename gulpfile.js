var gulp = require('gulp');
var ftp = require('gulp-ftp');

var ftpConfig = require('./ftpConfigs');

gulp.task('goLive', function () {
    gulp.src('./src/**/*.*')
        .pipe(ftp(ftpConfig));
});





