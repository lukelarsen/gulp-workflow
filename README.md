##My Gulp Workflow
###Usage
The only files you need:
- package.json
- .bowerrc (if you use Bower)
- gulpfile.js

All the other files are for testing to see if the gulp file runs as intended.

1. Move the three requred files to your project.
2. Run npm install
3. Adjust any of the configuration variables you need in the gulpfile to fit your project

###Tasks
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

####help
#####Description
Used to get a list of the available gulp tasks and sub tasks.

####default
#####Description
Set the default gulp task to be the help task.

####sass
#####Description
Compiles our Sass.

#####Dependencies
1. Task - [clean-styles](#clean-styles)
1. Function - [log](#log)
1. Plugin - Plumber
1. Plugin - Sass
1. Plugin - Uncss
1. Plugin - Autoprefixer
1. Plugin - Browser Sync

####sassdoc
Some stuff here

####images
Some stuff here

####fonts
Some stuff here

####watch
Some stuff here

####clean-styles
Some stuff here

####clean-styles-build
Some stuff here

####clean-images
Some stuff here

####clean-fonts
Some stuff here

####clean-build
Some stuff here

####wiredep
Some stuff here

####inject
Some stuff here

####serve
Some stuff here

####optimize
Some stuff here

####build
Some stuff here

####bump
Some stuff here

####workon
Some stuff here

###Custom Functions
- [log](#log)
- [clean](#clean)
- [getWiredepDefaultOptions](#getWiredepDefaultOptions)

####log
Some stuff here

####clean
Some stuff here

####getWiredepDefaultOptions
Some stuff here