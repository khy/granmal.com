module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        updateConfigs: ['pkg'],
        pushTo: 'origin',
      },
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
      },
    },
    shell: {
      buildDocker: {
        command: 'docker build -t khyland/granmal.com:<%= pkg.version %> .',
        options: {
          execOptions: {
            maxBuffer: (1000 * 1024),
          },
        },
      },
      ensureDockerMachine: {
        command: 'docker-machine active',
        options: {
          stdout: false,
          stderr: false,
          callback: function (err, stdout, stderr, cb) {
            if (err) {
              grunt.fail.warn('docker-machine is not active.');
            }

            grunt.log.writeln('docker-machine is configured properly.');
            cb();
          }
        }
      },
      pushDocker: {
        command: 'docker push khyland/granmal.com:<%= pkg.version %>',
        options: {
          execOptions: {
            maxBuffer: (1000 * 1024),
          },
        },
      },
    },
  });

  grunt.registerTask('release', [
    'shell:ensureDockerMachine',
    'karma:unit',
    'bump:patch',
    'shell:buildDocker',
    'shell:pushDocker',
  ]);

};
