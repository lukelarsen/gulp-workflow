/**
    Dependencies
    Configuration
        Root
        HTML
        Sass
        Javascript
        Images
        Fonts
        Bower
        Packages
        Build
    Gulp Help
    Sass Compilation
    Sass Doc
    Images
    Fonts
    Watchers
        Sass
    Cleaning
        Clean Styles Dev
        Clean Styles Build
        Clean Images
        Clean Fonts
        Clean Build
    Inject & Wiredep
        Inject Bower css/js and our js files
        Inject our CSS files
    BrowserSync
        Static Server
        Dynamic Server
    Optimize
    Build
    Bump
    Work On
    Custom Functions
        Logging
        Cleaning
        Wiredep
*/





// -----------------------------------------------------------------------------
// !Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var del = require('del');
var args = require('yargs').argv;
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var sassdoc = require('sassdoc');
var $ = require('gulp-load-plugins')({ lazy: true });





// -----------------------------------------------------------------------------
// !Configuration
// -----------------------------------------------------------------------------

// ^Root
var root = "./";


// ^HTML
var indexFile = './index.html';
var indexLocation = './';


// ^Sass
var sassInput = './stylesheets/**/*.scss';
var sassInputMain = './stylesheets/style.scss';
var sassOutput = './stylesheets/';
var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var mainCssFile = sassOutput + 'style.css';
var sassdocOptions = {
    dest: './sassdoc',
    exclude: ['linePoster.test.scss'],
    display: {
        watermark: false,
    },
    theme: "default",
    groups: {
        'undefined': 'Ungrouped',
        general: 'General',
        colors: 'Colors',
        typography: 'Typography',
        arrows: 'Arrows',
        buttons: 'Buttons',
        code: 'Code',
        forms: 'Forms',
        grids: 'Grids',
        icons: 'Icons',
        lists: 'Lists',
        media: 'Media',
        modals: 'Modals',
        navs: 'Navs',
        notifications: 'Notifications',
        resets: 'Resets',
        responsive: 'Responsive',
        tables: 'Tables',
        tips: 'Tips'
    }
};


// ^Javascript
// Using an array here in case we need to set the order of anything
// We can exclude items from the list with '!' + 'glob'
var js = [
    'js/**/*.js'
];


// ^Images
var images = './public/images/**/*.*';


// ^Fonts
var fonts = './public/fonts/**/*.*';


// ^Bower
var bower = {
    json: require('./bower.json'),
    directory: './bower_components',
    ignorePath: '' // Use if your index file is a few directories deep.
}


// ^Packages
var packages = [
    './package.json',
    './bower.json'
]


// ^Build
var build = './build/';





// -----------------------------------------------------------------------------
// !Glup Help
// -----------------------------------------------------------------------------

gulp.task('help', $.taskListing);


// Make the default gulp task the help task
gulp.task('default', ['help']);





// -----------------------------------------------------------------------------
// !Sass Compilation
// -----------------------------------------------------------------------------

// Sass Dev
gulp.task('sass', ['clean-styles'], function () {
    log('Compiling Sass --> CSS');

    return gulp
    .src(sassInputMain)
    .pipe($.plumber())
    .pipe($.sass(sassOptions).on('error', $.sass.logError))
    .pipe($.uncss({
        html: ['index.html', 'posts/**/*.html']
    }))
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.stream());
});





// -----------------------------------------------------------------------------
// !Sass Doc
// -----------------------------------------------------------------------------

gulp.task('sassdoc', function () {
    log('Creating Sass Docs');

    return gulp
    .src(['./**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(sassdoc(sassdocOptions))
    .resume();
});





// -----------------------------------------------------------------------------
// !Images
// -----------------------------------------------------------------------------

gulp.task('images', function() {
    log('Copying and compessing images');

    return gulp
    .src(images)
    .pipe($.imagemin({ optimizationLevel: 4 }))
    .pipe(gulp.dest(build + 'images'));
});





// -----------------------------------------------------------------------------
// !Fonts
// -----------------------------------------------------------------------------

gulp.task('fonts', function() {
    log('Copying fonts');

    return gulp
    .src(fonts)
    .pipe(gulp.dest(build + 'fonts'));
});





// -----------------------------------------------------------------------------
// !Watchers
// -----------------------------------------------------------------------------

// ^Sass
gulp.task('watch', function() {
    return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(sassInput, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
        log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});





// -----------------------------------------------------------------------------
// !Cleaning
// -----------------------------------------------------------------------------

// ^Clean Styles Dev
gulp.task('clean-styles', function(done) {
    clean(sassOutput + '**/*.css', done);
});


// ^Clean Styles Build
gulp.task('clean-styles-build', function(done) {
    clean(build + 'stylesheets/**/*.css', done);
});

// ^Clean Images
gulp.task('clean-images', function(done) {
    clean(build + 'images/**/*.*', done);
});


// ^Clean Fonts
gulp.task('clean-fonts', function(done) {
    clean(build + 'fonts/**/*.*', done);
});


// ^Clean Build
gulp.task('clean-build', function(done) {
    clean(build, done);
});



// -----------------------------------------------------------------------------
// !Inject & Wiredep
// -----------------------------------------------------------------------------

// ^Inject Bower css/js and our js files
gulp.task('wiredep', function() {
    log('Injecting Bower css/js and our js file(s) into the html.');

    var options = getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
    .src(indexFile)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(js), { relative: true }))
    .pipe(gulp.dest(indexLocation));
});


// ^Inject our css files
gulp.task('inject', ['sass', 'wiredep'], function() {
    log('Injecting our css file into the html.');

    return gulp
    .src(indexFile)
    .pipe($.inject(gulp.src(mainCssFile), { relative: true }))
    .pipe(gulp.dest(indexLocation));
});





// -----------------------------------------------------------------------------
// !BrowserSync
// -----------------------------------------------------------------------------

// ^Static Server
gulp.task('serve', function() {
    log('Starting BrowserSync on a static server.')

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(sassInput, ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

// or...

// ^Dynamic Server
// gulp.task('serve', function() {
//     log('Starting BrowserSync in a Dynamic Server.')
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });

//     gulp.watch(sassInput, ['sass']);
//     gulp.watch("**/*.html").on('change', browserSync.reload);
// });





// -----------------------------------------------------------------------------
// !Optimize
// -----------------------------------------------------------------------------

gulp.task('optimize', ['images', 'fonts', 'inject'], function() {
    log('Optimizing the html, css, and javascript.');

    var assets = $.useref.assets({ searchPath: './' });
    var cssFilter = $.filter('**/*.css');
    var jsFilter = $.filter('**/*.js');

    return gulp
    .src(indexFile)
    .pipe($.plumber())
    .pipe(assets)
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
    .pipe($.uglify({ mangle: false }))
    .pipe(jsFilter.restore())
    .pipe($.rev()) // ex index.html --> index-afu3298.html
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(build));
});





// -----------------------------------------------------------------------------
// !Build
// -----------------------------------------------------------------------------

gulp.task('build', function(callback) {
    runSequence(
        'clean-build',
        'optimize',
        callback
    );
});






// -----------------------------------------------------------------------------
// !Bump
// -----------------------------------------------------------------------------

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major verion x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
**/
gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }

    log(msg);

    return gulp
    .src(packages)
    .pipe($.bump(options))
    .pipe(gulp.dest(root));
});




// -----------------------------------------------------------------------------
// !Work On
// -----------------------------------------------------------------------------

gulp.task('workon', ['serve' /*, possible other tasks... */]);






// -----------------------------------------------------------------------------
// !Custom Functions
// -----------------------------------------------------------------------------

// ^Logging
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}


// ^Clean
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}


// ^Wiredep
function getWiredepDefaultOptions() {
    var options = {
        bowerJson: bower.json,
        directory: bower.directory,
        ignorePath: bower.ignorePath
    };
    return options;
}