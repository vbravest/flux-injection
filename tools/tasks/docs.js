const del = require('del');
const gulp = require('gulp');
const yuidoc = require('gulp-yuidoc');

/**
 * Auto-generate documentation from the code using the YUIdoc style of docblocks.
 * Output will be a documentation web page written to /docs.
 *
 * @task docs
 */
gulp.task('docs', ['cleanDocs'], done => {
    const parserOptions = {
        project: {
            name: global.pkg.name,
            description: global.pkg.description,
            version: global.pkg.version,
            url: global.pkg.homepage
        }
    };

    const generatorOptions = {
        helpers: [],
        themedir: 'tools/cache/yuidoc-friendly-theme'
    };

    return gulp
        .src(`${global.env.DIR_SRC}/assets/scripts/**/*.js`)
        .pipe(yuidoc.parser(parserOptions))
        .pipe(yuidoc.generator(generatorOptions))
        .pipe(gulp.dest(global.env.DIR_DOCS));
});

/**
 * Cleans docs directory
 *
 * @task cleanDocs
 */
gulp.task('cleanDocs', done => {
    return del(global.env.DIR_DOCS);
});
