const gulp = require('gulp');
const gulpIf = require('gulp-if');
const hb = require('gulp-hb');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const prettify = require('gulp-prettify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

/**
 * Builds HTML markup found in /src/assets/
 *
 * @task buildMarkup
 */
gulp.task('buildMarkup', done => {
    return build(false, done);
});

/**
 * Watches HTML markup found in /src/assets/
 *
 * @task watchMarkup
 */
gulp.task('watchMarkup', done => {
    gulp.watch(`${global.env.DIR_SRC}/**/*.{hbs,html}`, () => {
        build(true);
    });
    done();
});

function build(isWatch, done) {
    return gulp
        .src([
            `${global.env.DIR_SRC}/**/*.html`
        ])
        .pipe(plumber({
            errorHandler: notify.onError({ message: '<%= error.message %>', title: 'Markup error' })
        }))
        .pipe(hb({
            partials: `${global.env.DIR_SRC}/templates/**/*.hbs`,
            helpers: `${global.env.DIR_NPM}/handlebars-layouts/index.js`,
            data: `${global.env.DIR_SRC}/assets/data/*.json`
        }))
        .pipe(replace(/@@date/g, new Date().toUTCString()))
        .pipe(replace(/@@version/g, global.pkg.version))
        .pipe(gulp.dest(global.env.DIR_DEST))
        .pipe(gulpIf(isWatch, notify({
            message: ' ',
            title: 'Markup complete',
            onLast: true
        })))
        .pipe(global.browserSync.reload({ stream: true }));
}
