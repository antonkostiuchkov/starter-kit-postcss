var gulp 					= require('gulp');
		postcss 			= require('gulp-postcss');
		csswring			= require('csswring');
		autoprefixer 	= require('autoprefixer');
		lost				 	= require('lost');
		normalize			= require('postcss-normalize');
		stylus 				= require('gulp-stylus');
		jade        	= require('gulp-jade');
		imagemin    	= require('gulp-imagemin');
		browserSync 	= require('browser-sync');
		reload      	= browserSync.reload;

		// typographic = require('typographic');
		// nib = require('nib');




// Stylus > CSS
// With Postcss
gulp.task('styles', function(){
	var processors = [
		csswring,
		lost,
		normalize,
		autoprefixer
	];

	return gulp.src('assets/styles/main.styl')
		.pipe(stylus())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dest'))
		.pipe(reload({stream:true}));
});



// Jade -> HTML
// Compiles, uglifies, reloads
gulp.task('templates', function() {
	gulp.src('assets/templates/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./dest'))
		.pipe(reload({stream:true}));
		});



// Image task
// Compress
gulp.task('image', function () {
	gulp.src('assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dest/img'));
});



// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dest"
    }
  });
});



// Watching for canges
gulp.task('watch', function(){
	gulp.watch('**/*.styl', ['styles']);
	gulp.watch('**/*.jade', ['templates']);
});



// Default task
gulp.task('default', [
    'watch',
    'browser-sync'
 ]);
