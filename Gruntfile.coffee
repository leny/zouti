"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        coffee:
            options:
                bare: yes
            lib:
                files:
                    "lib/zouti.js": "lib/zouti.coffee"
        jshint:
            options:
                curly: yes
                eqeqeq: yes
                immed: yes
                newcap: yes
                noarg: yes
                sub: yes
                undef: yes
                unused: yes
                boss: yes
                eqnull: yes
                node: yes
            lib:
                src: [ "lib/zouti.js" ]
        watch:
            lib:
                files: "lib/zouti.coffee"
                tasks: [
                    "coffee"
                    "jshint"
                    "bumpup:prerelease"
                ]

    grunt.registerTask "default", [
        "coffee"
        "jshint"
    ]
