const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const { spawn } = require('child_process');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Build the Jekyll Site
function jekyllBuild(done) {
    const { exec } = require('child_process');
    const command = 'bundle exec jekyll build';
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Jekyll build error: ${error}`);
            return done(error);
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        done();
    });
}

// Compile SCSS files
function compileSass() {
    let stream = src('assets/css/sass/main.scss');
    
    if (!isProduction) {
        stream = stream.pipe(sourcemaps.init());
    }
    
    stream = stream
        .pipe(sass({
            outputStyle: isProduction ? 'compressed' : 'expanded',
            // Add includePaths so SCSS can find imported files
            includePaths: [
                'assets/css/sass',           // Main SCSS directory
                'assets/css/sass/parts',     // If you have a parts subdirectory
                'node_modules'               // For any npm-installed SCSS packages
            ]
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', '> 1%'],
            cascade: true
        }));
    
    if (!isProduction) {
        stream = stream.pipe(sourcemaps.write('./'));
    }
    
    return stream
        .pipe(dest('_site/assets/css'))
        .pipe(dest('assets/css'))
        .pipe(browserSync.stream());
}

// Optimize images
function optimizeImages() {
    return src('assets/img/**/*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { name: 'removeViewBox', active: false },
                    { name: 'cleanupIDs', active: false }
                ]
            })
        ])))
        .pipe(dest('assets/img'))
        .pipe(dest('_site/assets/img'))
        .pipe(browserSync.stream());
}

// Start browser sync server
function startServer(done) {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
    done();
}

// Reload browser
function reloadBrowser(done) {
    browserSync.reload();
    done();
}

// Watch files for changes
function watchFiles() {
    // Watch ALL SCSS files, not just main.scss
    watch('assets/css/sass/**/*.scss', compileSass);
    watch(['assets/img/**/*', '!assets/img/**/*.{jpg,jpeg,png,gif,svg}'], optimizeImages);
    watch([
        '*.html',
        '_layouts/*.html',
        '_includes/*.html',
        '_pages/*.html',
        '_posts/*',
        '_data/**/*',
        'assets/js/**/*.js'
    ], series(jekyllBuild, reloadBrowser));
}

// Clear cache
function clearCache(done) {
    return cache.clearAll(done);
}

// Build task
const build = series(
    parallel(compileSass, optimizeImages),
    jekyllBuild
);

// Development task
const dev = series(
    build,
    startServer,
    watchFiles
);

// Production build
const production = series(
    clearCache,
    parallel(compileSass, optimizeImages),
    jekyllBuild
);

// CI build (for GitHub Actions)
const ciBuild = series(
    clearCache,
    parallel(compileSass, optimizeImages)
);

// Export tasks
exports.sass = compileSass;
exports.images = optimizeImages;
exports.jekyll = jekyllBuild;
exports.clear = clearCache;
exports.build = build;
exports.serve = dev;
exports.watch = watchFiles;
exports.production = production;
exports.ci = ciBuild;
exports.default = dev;