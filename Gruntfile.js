module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        jshint : {
            all : {
                files : {
                    src : ["*.js", "**/*.js", "public/js/*.js", "public/js/**/*.js"]
                }
            }
        },
        watch : {
            all : {
                files : ["public/**/*", "public/js/**/*"],
                options : {
                    livereload : true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default task(s).
    grunt.registerTask("default", ["jshint", "watch"]);

};
