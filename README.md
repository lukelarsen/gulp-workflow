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

###default
Set the default gulp task to be the help task.

###sass
Compiles our Sass.

#####Dependencies
1. Task - [clean-styles](#clean-styles)
1. Function - [log](#log)
1. Plugin - [Gulp Plumber](http://google.com)
1. Plugin - Gulp Sass
1. Plugin - Gulp Uncss
1. Plugin - Gulp Autoprefixer
1. Plugin - Browser Sync

###sassdoc
Builds our Sass Docs for us.
#####Dependencies
1. Function - [log](#log)
1. Plugin - Sassdoc

###images
Compresses our images and moves them to the build directory.
#####Dependencies
1. Function - [log](#log)
1. Plugin - Gulp Imagemin

###fonts
Copies our fonts to the build directory.
#####Dependencies
1. Function - [log](#log)

###watch
Watches our Sass files for changes and runs the [sass](#sass) task when one changes.

###clean-styles
Clean out the generated css file(s).

###clean-styles-build
Clean out the css file(s) in the build directory.

###clean-images
Clean out the images in the build directory.

###clean-fonts
Clean out the fonts in the build directory.

###clean-build
Clean out all of build.

###wiredep
Injects Bower css/js and our js into our HTML file.

#####Dependencies
1. Function - [log](#log)
1. Plugin - Wiredep
1. Plugin - Gulp Inject

###inject
Injects our css into our HTML file.

#####Dependencies
1. Function - [log](#log)
1. Plugin - Gulp Inject

###serve
Some stuff here

###optimize
Some stuff here

###build
Some stuff here

###bump
Some stuff here

###workon
Some stuff here

##Functions
- [log](#log)
- [clean](#clean)
- [getWiredepDefaultOptions](#getWiredepDefaultOptions)

###log
Some stuff here

###clean
Some stuff here

###getWiredepDefaultOptions
Some stuff here