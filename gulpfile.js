const gulp = require('gulp')
const util = require('gulp-util')
const bump = require('gulp-bump')

gulp.task('bump-version', () => {
  return gulp.src('./package.json')
    .pipe(bump({type: "patch"}).on('error', util.log))
    .pipe(gulp.dest('./'))
})
