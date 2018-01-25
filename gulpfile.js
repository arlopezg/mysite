const gulp       = require('gulp')
const concatJS   = require('gulp-concat')
const minifyJS   = require('gulp-minify')
const minifyCSS  = require('gulp-minify-css')
const minifyHTML = require('gulp-htmlmin')

const src = {
  'HTML_SRC': './src/**/*.html',
  'JS_SRC':   './src/**/*.js',
  'CSS_SRC':  './src/**/*.css',
  'OTHER':    [
    './src/**/*.png',
    './src/**/*.webp',
    './src/**/*.woff',
    './src/**/*.woff2',
    './src/**/*.txt'
  ]
}

const target = {'PATH': './dist'}

gulp.task('default', ['workJS', 'workCSS', 'workHTML', 'workOthers'])

gulp.task('workHTML', function () {
  return gulp
  .src(src.HTML_SRC)
  .pipe(minifyHTML({'collapseWhitespace': true}))
  .pipe(gulp.dest(target.PATH))
})

gulp.task('workCSS', function () {
  return gulp
  .src(src.CSS_SRC)
  .pipe(minifyCSS({debug: true}, (details) => {
    console.log(`${details.name}: ${details.stats.originalSize}`)
    console.log(`${details.name}: ${details.stats.minifiedSize}`)
  }))
  .pipe(gulp.dest(target.PATH))
})

gulp.task('workJS', function () {
  return gulp
  .src(src.JS_SRC)
  .pipe(concatJS('mysite.js'))
  .pipe(minifyJS({
    'ext':         {'min': '.min.js'},
    'compress':    {
      'sequences':     true,// join consecutive statemets with the “comma operator”
      'properties':    true,// optimize property access: a["foo"] → a.foo
      'dead_code':     true,// discard unreachable code
      'drop_debugger': true,// discard “debugger” statements
      'conditionals':  true,// optimize if-s and conditional expressions
      'comparisons':   true,// optimize comparisons
      'evaluate':      true,// evaluate constant expressions
      'booleans':      true,// optimize boolean expressions
      'loops':         true,// optimize loops
      'unused':        true,// drop unused variables/functions
      'if_return':     true,// optimize if-s followed by return/continue
      'join_vars':     true // join var declarations
    },
    'noSource':    true,
    'exclude':     ['tasks'],
    'ignoreFiles': ['.combo.js', '-min.js']
  }))
  .pipe(gulp.dest(target.PATH))
})

gulp.task('workOthers', function () {
  return gulp
  .src(src.OTHER)
  .pipe(gulp.dest(target.PATH))
})