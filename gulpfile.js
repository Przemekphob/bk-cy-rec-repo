var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('reload', function() {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function() {

	browserSync({
		server: 'front'
	});

	gulp.watch('front/*.html', ['reload']);
	gulp.watch('front/scss/**/*.scss', ['sass']);

});

gulp.task('sass', function() {
	return gulp.src('front/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('front/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);