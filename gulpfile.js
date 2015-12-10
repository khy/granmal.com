const fs = require('fs')
const spawnSync = require('child_process').spawnSync

const gulp = require('gulp')
const util = require('gulp-util')
const bump = require('gulp-bump')

function version() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
}

gulp.task('bump-version', () => {
  return gulp.src('./package.json')
    .pipe(bump({type: "patch"}).on('error', util.log))
    .pipe(gulp.dest('./'))
})

gulp.task('build-docker', () => {
  spawnSync('docker', ['build', '-t', 'khyland/granmal.com:' + version(), '.'], {stdio: 'inherit'})
})

gulp.task('push-docker', () => {
  spawnSync('docker', ['push', 'khyland/granmal.com:' + version()], {stdio: 'inherit'})
})
