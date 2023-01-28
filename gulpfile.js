const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass')); //перевод из sass в css
const concat = require('gulp-concat');//обьединение файлов
const browserSync = require('browser-sync').create();//запуск веб сервера для быстрой перезагрузки в реальном времени
const uglify = require('gulp-uglify-es').default; //минимизация js
const autoprefixer = require('gulp-autoprefixer'); // автоматически проставляет префиксы к css свойствам для поддержки браузерами css свойств
const imagemin = require('gulp-imagemin'); //минимизация картинок
const del = require('del');

function browsersync() {
    browserSync.init({
        // server: {
        //     baseDir: 'app/'
        // }
        proxy: "dmotor-new.local",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
}
function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
    .pipe(imagemin(
    [
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 6}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]
    ))
    .pipe(dest('dist/images'))
}

function scripts () {
    return src([
    'app/js/jquery.min.js',
    'app/js/jquery-ui/jquery-ui.min.js',
    'app/js/jquery-ui/jquery-touch-punch.min.js',
    'app/js/underscore/underscore-min.js',
    'app/js/main.js',
    'app/js/header.js',
    'app/js/functions-tabs.js',
    'app/js/sort/sort.js',
    'app/js/sort/sort-adaptive.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify()) 
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/pdf/*',
        'app/favicon/*',
        'app/*.htm',
        'app/components/*.htm',
        'app/php/*.php',
        'app/*.php'
    ], {base: 'app'})
    .pipe(dest('dist'))
    
}

function watching() {
watch(['app/scss/**/*.scss'], styles);
watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
watch('app/*.html').on('change', browserSync.reload);
}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series (cleanDist,images, build);
exports.default = parallel(styles, scripts, browsersync, watching);