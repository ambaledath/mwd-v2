// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            //build: ['Grunfile.js', 'src/**/*.js']
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                '!src/js/vendor/**/*.js'
            ]
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: {
                    'dist/js/script.min.js': ['src/js/main.js']
                }
            }
        },

        // compile jade file to html -----------------------------------------
        pug: {
            build: {
                files: {
                    'dist/index.html': 'src/pug/index.pug'
                }
            }
        },

        // compile sass stylesheets to css -----------------------------------------
        less: {
            dist: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/style.min.css': 'src/less/style.less'
                }
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'src/images/',
                        src: ['**/*.png'],
                        // Could also match cwd line above. i.e. project-directory/img/
                        dest: 'dist/images/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'src/images/',
                        src: ['**/*.jpg'],
                        // Could also match cwd. i.e. project-directory/img/
                        dest: 'dist/images/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        // configure copy images from src to dist folder ---------------------------
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images/',
                        src: ['**/*.{png,jpg,svg,ico}'],
                        dest:'dist/images/'
                    }
                ]
            }
        },

        // configure watch for chaanges in JS, SASS and Pug files -------------------
        watch: {
            files: ['src/**/*.js','src/**/*.pug','src/**/*.less'],
            tasks: ['jshint','uglify','pug','less']
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ============= // CREATE TASKS ========== //
    grunt.registerTask('default', ['jshint', 'uglify', 'pug', 'less', 'imagemin', 'copy', 'watch']);

};
