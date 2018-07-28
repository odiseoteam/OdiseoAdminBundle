import { uglify } from 'rollup-plugin-uglify';
import concat from 'gulp-concat';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import merge from 'merge-stream';
import order from 'gulp-order';
import sourcemaps from 'gulp-sourcemaps';
import upath from 'upath';
import uglifycss from 'gulp-uglifycss';
import yargs from 'yargs';

const { argv } = yargs.options({
    rootPath: {
        description: '<path> path to web assets directory',
        type: 'string',
        requiresArg: true,
        required: true,
    },
    nodeModulesPath: {
        description: '<path> path to node_modules directory',
        type: 'string',
        requiresArg: true,
        required: false,
    },
});

const env = process.env.GULP_ENV;
const rootPath = upath.joinSafe(upath.normalizeSafe(argv.rootPath), 'admin');
const sourcePath = upath.normalizeSafe('./Resources/private');
const nodeModulesPath = upath.normalizeSafe(argv.nodeModulesPath);

const paths = {
    admin: {
        js: [
            upath.joinSafe(nodeModulesPath, 'jquery/dist/jquery.min.js'),
            upath.joinSafe(sourcePath, 'bootstrap/js/bootstrap.min.js'),
            upath.joinSafe(sourcePath, 'js/form-spinner.js'),
            upath.joinSafe(sourcePath, 'js/sylius-require-confirmation.js'),
            upath.joinSafe(sourcePath, 'js/sylius-form-collection.js'),
            upath.joinSafe(sourcePath, 'plugins/iCheck/icheck.min.js'),
            upath.joinSafe(sourcePath, 'js/AdminLTE/app.min.js'),
            upath.joinSafe(sourcePath, 'js/admin.js')
        ],
        css: [
            upath.joinSafe(sourcePath, 'bootstrap/css/bootstrap.min.css'),
            upath.joinSafe(nodeModulesPath, 'font-awesome/css/font-awesome.min.css'),
            upath.joinSafe(nodeModulesPath, 'ionicons/css/ionicons.min.css'),
            upath.joinSafe(sourcePath, 'plugins/iCheck/flat/blue.css'),
            upath.joinSafe(sourcePath, 'css/AdminLTE/AdminLTE.min.css'),
            upath.joinSafe(sourcePath, 'css/AdminLTE/skins/skin-blue.min.css'),
            upath.joinSafe(sourcePath, 'css/admin.css')
        ],
        login_js: [
            upath.joinSafe(nodeModulesPath, 'jquery/dist/jquery.min.js'),
            upath.joinSafe(sourcePath, 'bootstrap/js/bootstrap.min.js')
        ],
        login_css: [
            upath.joinSafe(sourcePath, 'bootstrap/css/bootstrap.min.css'),
            upath.joinSafe(nodeModulesPath, 'font-awesome/css/font-awesome.min.css'),
            upath.joinSafe(sourcePath, 'css/AdminLTE/AdminLTE.min.css'),
            upath.joinSafe(sourcePath, 'css/admin-outside.css')
        ],
        img: [
            upath.joinSafe(sourcePath, 'img/**')
        ],
        css_img: [
            upath.joinSafe(sourcePath, 'plugins/iCheck/flat/*.png')
        ],
        fonts: [
            upath.joinSafe(sourcePath, 'bootstrap/fonts/**'),
            upath.joinSafe(nodeModulesPath, 'font-awesome/fonts/**'),
            upath.joinSafe(nodeModulesPath, 'ionicons/fonts/**')
        ]
    },
};

const sourcePathMap = [
    {
        sourceDir: upath.relative('', nodeModulesPath),
        destPath: '/node_modules/',
    },
];

const mapSourcePath = function mapSourcePath(sourcePath) {
    const match = sourcePathMap.find(({ sourceDir }) => (
        sourcePath.substring(0, sourceDir.length) === sourceDir
    ));

    if (!match) {
        return sourcePath;
    }

    const { sourceDir, destPath } = match;

    return upath.joinSafe(destPath, sourcePath.substring(sourceDir.length));
};

export const buildOdiseoAdminJs = function buildOdiseoAdminJs() {
    return gulp.src(paths.admin.js, { base: './' })
        .pipe(gulpif(env !== 'prod', sourcemaps.init()))
        .pipe(concat('odiseo-admin.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env !== 'prod', sourcemaps.mapSources(mapSourcePath)))
        .pipe(gulpif(env !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(upath.joinSafe(rootPath, 'js')))
        .pipe(livereload())
    ;
};
buildOdiseoAdminJs.description = 'Build odiseo admin js assets.';

export const buildOdiseoAdminCss = function buildOdiseoAdminCss() {
    const cssStream = gulp.src(paths.admin.css, { base: './' })
        .pipe(gulpif(env !== 'prod', sourcemaps.init()))
        .pipe(concat('css-files.css'));


    return merge(cssStream)
        .pipe(order(['css-files.css']))
        .pipe(concat('odiseo-admin.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(gulpif(env !== 'prod', sourcemaps.mapSources(mapSourcePath)))
        .pipe(gulpif(env !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(upath.joinSafe(rootPath, 'css')))
        .pipe(livereload())
    ;
};
buildOdiseoAdminCss.description = 'Build odiseo admin css assets.';


export const buildOdiseoAdminLoginJs = function buildOdiseoAdminLoginJs() {
    return gulp.src(paths.admin.login_js, { base: './' })
        .pipe(gulpif(env !== 'prod', sourcemaps.init()))
        .pipe(concat('odiseo-admin-login.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env !== 'prod', sourcemaps.mapSources(mapSourcePath)))
        .pipe(gulpif(env !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(upath.joinSafe(rootPath, 'js')))
        .pipe(livereload());
};
buildOdiseoAdminLoginJs.description = 'Build odiseo admin login js assets.';

export const buildOdiseoAdminLoginCss = function buildOdiseoAdminLoginCss() {
    const cssStream = gulp.src(paths.admin.css, { base: './' })
        .pipe(gulpif(env !== 'prod', sourcemaps.init()))
        .pipe(concat('css-files.css'));


    return merge(cssStream)
        .pipe(order(['css-files.css']))
        .pipe(concat('odiseo-admin-login.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(gulpif(env !== 'prod', sourcemaps.mapSources(mapSourcePath)))
        .pipe(gulpif(env !== 'prod', sourcemaps.write('./')))
        .pipe(gulp.dest(upath.joinSafe(rootPath, 'css')))
        .pipe(livereload())
        ;
};
buildOdiseoAdminLoginCss.description = 'Build odiseo admin login css assets.';

export const buildOdiseoAdminImg = function buildOdiseoAdminImg() {
    return merge(
        gulp.src(paths.admin.img)
            .pipe(gulp.dest(upath.joinSafe(rootPath, 'img'))),
    );
};
buildOdiseoAdminImg.description = 'Build odiseo admin img assets.';

export const buildOdiseoAdminCssImg = function buildOdiseoAdminCssImg() {
    return merge(
        gulp.src(paths.admin.css_img)
            .pipe(gulp.dest(upath.joinSafe(rootPath, 'css'))),
    );
};
buildOdiseoAdminImg.description = 'Build odiseo admin css img assets.';

export const buildOdiseoAdminFonts = function buildOdiseoAdminFonts() {
    return merge(
        gulp.src(paths.admin.fonts)
            .pipe(gulp.dest(upath.joinSafe(rootPath, 'fonts'))),
    );
};
buildOdiseoAdminImg.description = 'Build odiseo admin fonts assets.';

export const watchOdiseoAdmin = function watchOdiseoAdmin() {
    livereload.listen();

    gulp.watch(paths.admin.js, buildOdiseoAdminJs);
    gulp.watch(paths.admin.css, buildOdiseoAdminCss);
    gulp.watch(paths.admin.login_js, buildOdiseoAdminLoginJs);
    gulp.watch(paths.admin.login_css, buildOdiseoAdminLoginCss);
    gulp.watch(paths.admin.img, buildOdiseoAdminImg);
    gulp.watch(paths.admin.css_img, buildOdiseoAdminCssImg);
    gulp.watch(paths.admin.fonts, buildOdiseoAdminFonts);

};
watchOdiseoAdmin.description = 'Watch odiseo admin asset sources and rebuild on changes.';

export const build = gulp.parallel(buildOdiseoAdminJs, buildOdiseoAdminCss, buildOdiseoAdminLoginJs, buildOdiseoAdminLoginCss, buildOdiseoAdminImg, buildOdiseoAdminCssImg, buildOdiseoAdminFonts);
build.description = 'Build assets.';

export const watch = gulp.parallel(build, watchOdiseoAdmin);
watch.description = 'Watch asset sources and rebuild on changes.';

export default build;