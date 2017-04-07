var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    sass = require('gulp-sass'),
    //uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //cssnano = require('gulp-cssnano'),
    prefix = require('gulp-autoprefixer'),
    browser = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    partials = require('gulp-inject-partials');

gulp.task('sass', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(cssnano())
        .pipe(prefix({
            browsers: ['> 1%']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../_preview/css'))
        .pipe(browser.reload({
            stream: true
        }));
});

gulp.task('css-copy', function () {
    gulp.src('../css/*.min.css')
    .pipe(gulp.dest('../_preview/css'));
});

gulp.task('fonts-copy', function () {
    gulp.src('../fonts/*-webfont.*')
    .pipe(gulp.dest('../_preview/fonts'));
});

gulp.task('images-copy', function () {
    gulp.src('../images/**')
    .pipe(gulp.dest('../_preview/images'));
});


gulp.task('js', function () {
    gulp.src('_modules/**/scripts/*.js')
        //.pipe(uglify())
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest('../_preview/scripts/core/controls'))
        .pipe(browser.reload({
            stream: true,
            once: true
        }));
    gulp.src('_scripts/core/*.js')
       //.pipe(uglify())
       .pipe(rename({
           dirname: ''
       }))
       .pipe(gulp.dest('../_preview/scripts/core'))
       .pipe(browser.reload({
           stream: true,
           once: true
       }));
    gulp.src('_scripts/libs/*.js')
       //.pipe(uglify())
       .pipe(rename({
           dirname: ''
       }))
       .pipe(gulp.dest('../_preview/scripts/libs'))
       .pipe(browser.reload({
           stream: true,
           once: true
       }));
});

gulp.task('templates', function () {
    gulp.src('_templates/*.html')
        .pipe(partials({
            removeTags: true
        }))
        .pipe(wrap({
            src: '_layout.html'
        }))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest('../_preview/templates'))
        .pipe(browser.reload({
            stream: true
        }));
});

gulp.task('modules', function () {
    gulp.src('_modules/**/*.html')
        .pipe(wrap({
            src: '_layout.html'
        }))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest('../_preview/modules'))
        .pipe(browser.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {

    browser.init(null, {
        server: {
            baseDir: "../"
        }
    });

});

gulp.task('watch', function () {
    gulp.watch(['_scss/*.scss', '_scss/**/*scss', '_modules/**/scss/*.scss'], ['sass']);
    gulp.watch('_modules/**/scripts/*.js', ['js']);
    gulp.watch('_modules/**/*.html', ['modules', 'templates']);
    gulp.watch('_templates/**/*.html', ['templates']);
    //gulp.watch('html/**/*.html', ['index']);
});
gulp.task('deploy', ['sass', 'js', 'images-copy', 'templates', 'css-copy', 'fonts-copy']);
gulp.task('default', ['sass', 'js', 'images-copy', 'templates', 'css-copy', 'fonts-copy', 'watch', 'browser-sync']);
