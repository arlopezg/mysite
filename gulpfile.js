const gulp       = require("gulp");
const concatJS   = require("gulp-concat");
const minifyJS   = require("gulp-minify");
const minifyCSS  = require("gulp-clean-css");
const minifyHTML = require("gulp-htmlmin");

const src    = {"HTML_SRC": "./*.html", "JS_SRC": "./**/*.js", "CSS_SRC": "./**/*.css"};
const target = {"PATH": "./public/"};

ulp.task("default", ["workJS", "workCSS", "workHTML"]);

gulp.task("workHTML", function() {
	return gulp
	.src(src.HTML_SRC)
	.pipe(minifyHTML({"collapseWhitespace": true}))
	.pipe(gulp.dest(target.PATH));
});

gulp.task("workCSS", function() {
	return gulp
	.src(src.CSS_SRC)
	.pipe(minifyCSS({debug: true}, (details) => {
		console.log(`${details.name}: ${details.stats.originalSize}`);
		console.log(`${details.name}: ${details.stats.minifiedSize}`);
	}))
	.pipe(gulp.dest(target.PATH));
});

gulp.task("workJS", function() {
	return gulp
	.src(src.JS_SRC)
	.pipe(concatJS('mysite.js'))
	.pipe(minifyJS({
		ext:         {min: '.min.js'},
		noSource:    true,
		exclude:     ['tasks'],
		ignoreFiles: ['.combo.js', '-min.js']
	}))
	.pipe(gulp.dest(target.PATH));
});