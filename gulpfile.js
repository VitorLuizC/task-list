const gulp    = require('gulp')
const pug     = require('gulp-pug')
const rename  = require('gulp-rename')
const styl    = require('gulp-stylus')
const path    = require('path')
const webpack = require('webpack')

const config = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  }
}

gulp.task('build:js', function (done) {
  webpack(config, (error, stats) => {
    if (error) {
      console.error(error)
      this.emit('end')
    }

    const info = stats.toString({
      colors: true
    })

    console.log(info)
    done()
  })
})

gulp.task('build:pug', () => {
  gulp.src('./src/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:styl', () => {
  gulp.src('./src/index.styl')
    .pipe(styl())
    .pipe(rename({ basename: 'style' }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['build:js', 'build:pug', 'build:styl'])

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/**/*.js', ['build:js'])
  gulp.watch('./src/**/*.pug', ['build:pug'])
  gulp.watch('./src/**/*.styl', ['build:styl'])
})

gulp.task('default', ['watch'])
