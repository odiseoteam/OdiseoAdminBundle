var concat = require('gulp-concat');
var env = process.env.GULP_ENV;
var gulp = require('gulp');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var order = require('gulp-order');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var argv = require('yargs').argv;

var rootPath = argv.rootPath;
var adminRootPath = rootPath + 'admin/';
var nodeModulesPath = argv.nodeModulesPath;

var paths = {
    admin: {
        js: [
            nodeModulesPath + 'jquery/dist/jquery.min.js',
            nodeModulesPath + 'bootstrap/dist/js/bootstrap.min.js',
            'Resources/private/js/form-spinner.js',
            'Resources/private/js/sylius-require-confirmation.js',
            'Resources/private/plugins/iCheck/icheck.min.js',
            'Resources/private/js/AdminLTE/app.min.js',
            'Resources/private/js/admin.js'
        ],
        css: [
            nodeModulesPath + 'bootstrap/dist/css/bootstrap.min.css',
            nodeModulesPath + 'font-awesome/css/font-awesome.min.css',
            nodeModulesPath + 'ionicons/css/ionicons.min.css',
            'Resources/private/plugins/iCheck/flat/blue.css',
            'Resources/private/css/AdminLTE/AdminLTE.min.css',
            'Resources/private/css/AdminLTE/skins/skin-blue.min.css',
            'Resources/private/css/admin.css'
        ],
        login_js: [
            nodeModulesPath + 'jquery/dist/jquery.min.js',
            nodeModulesPath + 'bootstrap/dist/js/bootstrap.min.js'
        ],
        login_css: [
            nodeModulesPath + 'bootstrap/dist/css/bootstrap.min.css',
            nodeModulesPath + 'font-awesome/css/font-awesome.min.css',
            'Resources/private/css/AdminLTE/AdminLTE.min.css',
            'Resources/private/css/admin-outside.css'
        ],
        img: [
            'Resources/private/img/**'
        ],
        css_img: [
            'Resources/private/plugins/iCheck/flat/*.png'
        ],
        fonts: [
            nodeModulesPath + 'bootstrap/dist/fonts/**',
            nodeModulesPath + 'font-awesome/fonts/**',
            nodeModulesPath + 'ionicons/fonts/**'
        ]
    }
};

gulp.task('admin-js', function () {
    return gulp.src(paths.admin.js)
        .pipe(concat('admin.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'js/'))
    ;
});

gulp.task('admin-css', function() {
    return gulp.src(paths.admin.css)
        .pipe(concat('admin.css'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'css/'))
        .pipe(livereload())
    ;
});

gulp.task('admin-login-js', function() {
    return gulp.src(paths.admin.login_js)
        .pipe(concat('login.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'js/'))
        .pipe(livereload())
    ;
});

gulp.task('admin-login-css', function() {
    return gulp.src(paths.admin.login_css)
        .pipe(concat('login.css'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'css/'))
        .pipe(livereload())
    ;
});

gulp.task('admin-img', function() {
    return gulp.src(paths.admin.img)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'img/'))
    ;
});

gulp.task('admin-css-img', function() {
    return gulp.src(paths.admin.css_img)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'css/'))
    ;
});

gulp.task('admin-fonts', function() {
    return gulp.src(paths.admin.fonts)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(adminRootPath + 'fonts/'))
        .pipe(livereload())
    ;
});

gulp.task('admin-watch', function() {
    livereload.listen();

    gulp.watch(paths.admin.js, ['admin-js']);
    gulp.watch(paths.admin.css, ['admin-css']);
    gulp.watch(paths.admin.login_css, ['admin-login-css']);
    gulp.watch(paths.admin.img, ['admin-img']);
});

gulp.task('default', ['admin-js', 'admin-css', 'admin-css-img', 'admin-login-js', 'admin-login-css', 'admin-img', 'admin-fonts']);
gulp.task('watch', ['default', 'admin-watch']);