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
    'karma:unit',
    'bump:patch',
    'shell:buildDocker',
    'shell:pushDocker',
  ]);

};
