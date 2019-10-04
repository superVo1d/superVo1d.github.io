var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    watch       = require('gulp-watch'),
    reload      = browserSync.reload;

var path = {
	build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        img: 'src/img/*.png'
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        img: 'src/img/*.png'
    }
};

var config = { 
    server: {
        baseDir: "src/"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    notify: false
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
})

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.js)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
})

gulp.task('css:build', function () {
    gulp.src(path.src.css) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.css)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
})

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);




