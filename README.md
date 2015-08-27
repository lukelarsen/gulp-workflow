#My Gulp Workflow
- [Usage](#usage)
- [Tasks](#tasks)
- [Functions](#functions)

##Usage
The only files you need:
- package.json
- .bowerrc (if you use Bower)
- gulpfile.js

All the other files are for testing to see if the gulp file runs as intended.

1. Move the three required files to your project.
2. Run npm install
3. Adjust any of the configuration variables you need in the gulpfile to fit your project

If you add more gulp plugins they will be added automatically with [Gulp Load Plugins](https://github.com/jackfranklin/gulp-load-plugins).

##Tasks
- [help](#help)
- [default](#default)
- [sass](#sass)
- [sassdoc](#sassdoc)
- [images](#images)
- [fonts](#fonts)
- [watch](#watch)
- [clean-styles](#clean-styles)
- [clean-styles-build](#clean-styles-build)
- [clean-images](#clean-images)
- [clean-fonts](#clean-fonts)
- [clean-build](#clean-build)
- [wiredep](#wiredep)
- [inject](#inject)
- [serve](#serve)
- [optimize](#optimize)
- [build](#build)
- [bump](#bump)
- [workon](#workon)

###help
Used to get a list of the available gulp tasks and sub tasks.

#####Dependencies
1. Plugin - [Gulp Task Listing](https://github.com/OverZealous/gulp-task-listing)

###default
Set the default gulp task to be the help task.

###sass
Compiles our Sass.

#####Dependencies
1. Task - [clean-styles](#clean-styles)
1. Function - [log](#log)
1. Plugin - [Gulp Plumber](https://github.com/floatdrop/gulp-plumber)
1. Plugin - [Gulp Sass](https://github.com/dlmanning/gulp-sass)
1. Plugin - [Gulp Uncss](https://github.com/ben-eb/gulp-uncss)
1. Plugin - [Gulp Autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
1. Plugin - [Browser Sync](https://github.com/Browsersync/browser-sync)

###sassdoc
Builds our Sass Docs for us.
#####Dependencies
1. Function - [log](#log)
1. Plugin - [Sassdoc](https://github.com/SassDoc/sassdoc)

###images
Compresses our images and moves them to the build directory.

#####Dependencies
1. Function - [log](#log)
1. Plugin - [Gulp Imagemin](https://github.com/sindresorhus/gulp-imagemin)

###fonts
Copies our fonts to the build directory.
#####Dependencies
1. Function - [log](#log)

###watch
Watches our Sass files for changes and runs the [sass](#sass) task when one changes.

###clean-styles
Clean out the generated css file(s).

#####Dependencies
1. Function - [clean](#clean)

###clean-styles-build
Clean out the css file(s) in the build directory.

#####Dependencies
1. Function - [clean](#clean)

###clean-images
Clean out the images in the build directory.

#####Dependencies
1. Function - [clean](#clean)

###clean-fonts
Clean out the fonts in the build directory.

#####Dependencies
1. Function - [clean](#clean)

###clean-build
Clean out all of build.

#####Dependencies
1. Function - [clean](#clean)

###wiredep
Injects Bower css/js and our js into our HTML file.

#####Dependencies
1. Function - [log](#log)
1. Function - [getWiredepDefaultOptions](#getWiredepDefaultOptions)
1. Plugin - [Wiredep](https://github.com/taptapship/wiredep)
1. Plugin - [Gulp Inject](https://github.com/klei/gulp-inject)

###inject
Injects our css into our HTML file.

#####Dependencies
1. Task - [sass](#sass)
1. Task - [wiredep](#wiredep)
1. Function - [log](#log)
1. Plugin - [Gulp Inject](https://github.com/klei/gulp-inject)

###serve
Starts BrowserSync on a static or dynamic server.

#####Dependencies
1. Function - [log](#log)
1. Plugin - [BrowserSync](https://github.com/Browsersync/browser-sync)
1. Task - [sass](#sass)

###optimize
Optimizes HTML, CSS, and JavaScript.

#####Dependencies
1. Task - [images](#images)
1. Task - [fonts](#fonts)
1. Task - [inject](#inject)
1. Function - [log](#log)
1. Plugin - [Gulp Useref](https://github.com/jonkemp/gulp-useref)
1. Plugin - [Gulp Filter](https://github.com/sindresorhus/gulp-filter)
1. Plugin - [Gulp Plumber](https://github.com/floatdrop/gulp-plumber)
1. Plugin - [Gulp csso](https://github.com/ben-eb/gulp-csso)
1. Plugin - [Gulp Uglify](https://github.com/terinjokes/gulp-uglify/)
1. Plugin - [Gulp Rev](https://github.com/sindresorhus/gulp-rev)
1. Plugin - [Gulp Rev Replace](https://github.com/jamesknelson/gulp-rev-replace)

###build
Builds our application.

#####Dependencies
1. Plugin - [Run Sequence](https://github.com/OverZealous/run-sequence)

#####Calls Tasks
1. [clean-build](#clean-build)
1. [optimize](#optimize)

###bump
Updates version numbers of our app.
* --type=pre will bump the prerelease version *.*.*-x
* --type=patch or no flag will bump the patch version *.*.x
* --type=minor will bump the minor version *.x.*
* --type=major will bump the major verion x.*.*
* --version=1.2.3 will bump to a specific version and ignore other flags

#####Dependencies
1. Function - [log](#log)
1. Plugin - [Gulp Bump](https://github.com/stevelacy/gulp-bump)
1. Plugin - [Yargs](https://github.com/bcoe/yargs)

###workon
Use when working on the application.

#####Dependencies
1. Task - [serve](#serve)
1. Add more

##Functions
- [log](#log)
- [clean](#clean)
- [getWiredepDefaultOptions](#getWiredepDefaultOptions)

###log
Used to output logs to the terminal.

#####Dependencies
1. Plugin - [Gulp Util](https://github.com/gulpjs/gulp-util)

###clean
Used to clean out code and folders.

#####Dependencies
1. Function - [log](#log)
1. Plugin - [del](https://github.com/sindresorhus/del)


###getWiredepDefaultOptions
Used in the wiredep task to put Bower css/js and other js into our HTML automatically.