const gulp = require('gulp');
const path = require('path');

/**
 * Runs local server @ https://localhost:3000
 * Default port and behavior of browser to auto-open can be edited in env-*.js.
 *
 * @task serve
 */
gulp.task('serve', ['watch'], done => {
    global.browserSync.init({
        port: global.env.SERVER_PORT,
        https: { // Allows local SSL development
            key: path.resolve('tools/certificates/localhost.key'),
            cert: path.resolve('tools/certificates/localhost.crt')
        },
        ui: false,
        notify: false,
        injectChanges: true, // false for page refresh
        open: global.env.SERVER_OPEN,
        server: {
            baseDir: global.env.DIR_DEST
        }
    });
});
