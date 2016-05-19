const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * Optimize all GIF, PNG, JPG, and SVG assets in /src/assets/media/images.
 *
 * All images will be losslessly compressed (eg, image quality will not degrade).
 * Compressed images in the source directory will replace the original versions;
 * commit the compressed images source control.    
 *
 * @task optimize
 */
gulp.task('optimize', done => {
    return gulp
        .src(`${global.env.DIR_SRC}/assets/media/images/**/*.+(png|jpg|gif|svg)`)
        .pipe(imagemin({
            verbose: true,
            progressive: true,
            optimizationLevel: 7,
            use: [pngquant()], // pngquant not included by default in gulp-imagemin
        }))
        .pipe(gulp.dest(`${global.env.DIR_SRC}/assets/media/images/`));
});
