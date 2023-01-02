//  declare gulp methods
const {src, dest, series, watch } = require('gulp') 

// !styles
// declaring gulp plugins for the styles
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssMin = require('gulp-clean-css')

function styles(){
    // first return my source loc and chain it with the gulp plugins 
    return src('./src/scss/**/*.scss')
        .pipe ( scss() )
        .pipe(autoprefixer('last 2 versions'))
        .pipe( cssMin() )
        // declare save loc for my processed files
        .pipe( dest('./dist/styles/') )
}

// !scripts
//* declaring gulp plugins for the scripts

const jsMin = require('gulp-terser')

function scripts(){
    return src('./src/js/**/*.js')
        .pipe( jsMin() )
        .pipe(dest('./dist/js'))
}

//!watchTask
// used the series method to invoke two my styles and script function
function watchTask(){
    watch(
        /*the watch func takes two param. 
        the locations of the task you want to monitor for changes
        */
        ['./src/scss/**/*.scss', './src/js/**/*.js'],
        series(styles,scripts)
    )
}

// exported the 
exports.default = series(styles, scripts , watchTask)
