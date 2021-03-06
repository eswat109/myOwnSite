module.exports = function (grunt) {
//описываем конфигурацию
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

    jshint: { // описываем как будет проверять наш код - jsHint
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            globals: {
                jQuery: true,
                $: true,
                console: true
            }
        },
        '<%= pkg.name %>': { //вставляем название проекта из package.json
            src: [ 'public/js/**/*.js' ] //какие файлы надо проверять
        }
    },

    /*
    concat: { //описываем работу плагина конкатенации
        dist: {
            src: ['src/js/file1.js', 'src/js/file2.js'], // какие файлы конкатенировать
            dest: 'dest/build.js' // куда класть файл, который получиться после процесса конкатенации
        }
    },

     */

    uglify: { //описываем работу плагина минификации js - uglify.
        options: {
            stripBanners: true,
            banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
        },

        build: {
            src: 'public/js/form.js', // какой файл минифицировать
            dest: 'public/build/build.min.js' // куда класть файл, который получиться после процесса минификации
        }
    },

    cssmin: { //описываем работу плагина минификации и конкатенации css.
        with_banner: {
            options: {
                banner: '/* My minified CSS */' //комментарий который будет в output файле.
            },

            files: {
                'public/build/style.min.css' : ['public/css/main.css', 'public/css/form.css', 'public/css/carousel.css'] // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
            }
        }
    },

    watch: { //описываем работу плагина слежки за файлами.
        scripts: {
            files: ['public/js/*.js'], //следить за всеми js файлами в папке src
            tasks: ['jshint', /*'concat',*/ 'uglify', 'removelogging'] //при их изменении запускать следующие задачи
        },
        css: {
            files: ['public/css/*.css'], //следить за всеми css файлами в папке src
            tasks: ['cssmin'] //при их изменении запускать следующую задачу
        }
    },

    removelogging: { //описываем работу плагина удаления логов
        dist: {
            src: "public/build/build.min.js", // файл который надо отчистить от console.log
            dest: "public/build/build.clean.js" // выходной файл, который получим после очистки
        }
    }

});

//подгружаем необходимые плагины
grunt.loadNpmTasks('grunt-contrib-jshint');
//grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-remove-logging');

//регистрируем задачу
grunt.registerTask('default', ['jshint', /*'concat',*/ 'uglify', 'cssmin', 'removelogging', 'watch']); //задача по умолчанию, просто grunt
 //пока пусто, но кто знает, возможно в следующих уроках мы этим воспользуемся :)
};