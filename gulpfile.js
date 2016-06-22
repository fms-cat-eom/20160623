( function() {

  'use strict';

  let gulp = require( 'gulp' );

  let browserify = require( 'browserify' );
  let watchify = require( 'watchify' );
  let babelify = require( 'babelify' );
  let sass = require( 'gulp-sass' );
  let source = require( 'vinyl-source-stream' );

  let browserSync = require( 'browser-sync' );

  // ---

  gulp.task( 'static-build',function() {
    gulp.src( [ './src/static/**/*' ] )
    .pipe( gulp.dest( './dist' ) );
  } );

  gulp.task( 'static-watch', function() {
    gulp.watch( './src/static/**', [ 'static-build' ] );
  } );

  // ---

  gulp.task( 'style-build', function() {
    return gulp.src( './src/style/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './dist' ) )
    .pipe( browserSync.stream() )
  } );

  gulp.task( 'style-watch', function() {
    gulp.watch( './src/style/**', [ 'style-build' ] );
  } );

  // ---

  let brwsrfy = browserify( {
    cache: {},
    packageCache: {},
    fullPaths: true,
    entries: [ './src/script/main.js' ],
    transform: [
      [ babelify, {
        presets: 'es2015'
      } ],
      'glslify'
    ]
  } );

  gulp.task( 'script-build', function() {
    brwsrfy.bundle()
    .on( 'error', function( _error ) {
      console.error( _error );
      this.emit( 'end' );
    } )
    .pipe( source( 'main.js' ) )
    .pipe( gulp.dest( './dist' ) );
  } );

  gulp.task( 'script-watch', function() {
    let wtcfy = watchify( brwsrfy );

    wtcfy.on( 'update', function() {
      console.log( '🔮 Browserify!' );
      wtcfy.bundle()
      .on( 'error', function( _error ) {
        console.error( _error );
        this.emit( 'end' );
      } )
      .pipe( source( 'main.js' ) )
      .pipe( gulp.dest( './dist' ) );
    } );

    wtcfy.on( 'log', function( _log ) {
      console.log( '🍕 ' + _log );
    } );
  } );

  // ---

  gulp.task( 'browser-init', function() {
    browserSync.init( {
      server: './dist'
    } );
  } );

  gulp.task( 'browser-reload', function() {
    browserSync.reload();
  } );

  gulp.task( 'browser-watch', function() {
    gulp.watch( [ './dist/**', '!./dist/**/*.css' ], [ 'browser-reload' ] );
  } );

  // ---

  gulp.task( 'watch', [
    'static-watch',
    'style-watch',
    'script-watch'
  ] );

  gulp.task( 'build', [
    'static-build',
    'style-build',
    'script-build'
  ] );

  gulp.task( 'browser', [
    'browser-init',
    'browser-watch'
  ] );

  gulp.task( 'dev', [
    'build',
    'watch',
    'browser'
  ] );

  gulp.task( 'default', [
    'dev'
  ] );

} )();
