const fs = require('fs')
const spawnSync = require('child_process').spawnSync

const gulp = require('gulp')
const util = require('gulp-util')
const bump = require('gulp-bump')
const git = require('gulp-git')

function version() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
}

gulp.task('set-release-version', () => {
  return gulp.src('./package.json').
    pipe(bump({type: "patch"}).on('error', util.log)).
    pipe(gulp.dest('./'))
})

gulp.task('commit-release-version', ['set-release-version'], () => {
  return gulp.src('./package.json').
    pipe(git.commit('Setting version to ' + version()))
})

gulp.task('tag-release-version', ['commit-release-version'], (cb) => {
  git.tag('v' + version(), 'Releasing ' + version(), (err) => {
    return err ? cb(err) : cb()
  })
})

gulp.task('build-docker', () => {
  spawnSync('docker', ['build', '-t', 'khyland/granmal.com:' + version(), '.'], {stdio: 'inherit'})
})

gulp.task('push-docker', () => {
  spawnSync('docker', ['push', 'khyland/granmal.com:' + version()], {stdio: 'inherit'})
})

gulp.task('release-version', ['set-release-version', 'commit-release-version', 'tag-release-version'])
