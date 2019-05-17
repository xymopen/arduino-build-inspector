/// <reference types="node" />

import * as fs from "fs";
import * as path from "path";
import { isObject, visitConfig, visitValue, format } from "./common.mjs"
import { interpretPath, splitKey, parseDefined, mergeDefineds } from "./arduino.mjs"

/** @param {string} str */
const format2 = str => format( str, key => {
	const path = splitKey( key );

	try {
		return visitValue( defined, [ ...path, os ] );
	} catch ( e ) {
		try {
			return visitValue( defined, path );
		} catch ( e ) { }
	}
} );

const filterBy = ( text, regex ) => Array.from( new Set(
	text.split( /\s+(?=-)/g )
		.map( e => e.replace( /^("|')|\1$/g, "" ) )
		.filter( e => ( regex ).test( e ) )
) );

const os = {
	"linux": "linux",
	"win32": "windows",
	"darwin": "macosx"
}[ process.platform ];

/**
 * @param {string} key
 * @param {object} defined
 */
const osDepentVisit = ( key, defined ) => {
	const path = splitKey( key );

	try {
		return visitConfig( defined, [ ...path, os ] );
	} catch ( e ) {
		try {
			return visitConfig( defined, path );
		} catch ( e ) { }
	}
};

const {
	hardware: hardwareRoot,
	platform: platformRoot,
	arch,
} = interpretPath( process.argv[ 2 ] );

const variant = process.argv[ 3 ];

const platformDefined = parseDefined( fs.readFileSync( path.resolve( platformRoot, "platform.txt" ), "utf-8" ) ),
	boardsDefined = parseDefined( fs.readFileSync( path.resolve( platformRoot, "boards.txt" ), "utf-8" ) );

const variantDefined = boardsDefined[ variant ];

const userDefineds = process.argv.slice( 4 ).map( defined => {
	if ( ( /^menu\./ ).test( defined ) ) {
		const menuDefined = osDepentVisit( defined, variantDefined );

		if ( isObject( menuDefined ) ) {
			return menuDefined;
		} else {
			return {};
		}
	} else {
		return parseDefined(defined);
	}
} );

const corePath = path.resolve( platformRoot, "cores", variantDefined.build.core ),
	variantPath = path.resolve( platformRoot, "variants", variantDefined.build.variant ),
	systemPath = path.resolve( platformRoot, "system" );

const predefined = parseDefined( `
	build.arch=${ arch }
	build.core.path=${ corePath }
	build.system.path=${ systemPath }
	build.variant.path=${ variantPath }
	includes=-I${ corePath } -I${ variantPath }
	runtime.hardware.path=${ hardwareRoot }
	runtime.os=${ os }
	runtime.platform.path=${ platformRoot }
` );

// runtime.ide.path=
// runtime.ide.version=
// ide_version=
// build.path=
// build.project_name=
// sketch_path=
// serial.port=

const defined = mergeDefineds( predefined, platformDefined, variantDefined, ...userDefineds );

const cCompilerRecipe = format2( "{recipe.c.o.pattern}" ),
	cppCompilerRecipe = format2( "{recipe.cpp.o.pattern}" ),
	assemblierRecipe = format2( "{recipe.S.o.pattern}" ),
	linkerRecipe = format2( "{recipe.c.combine.pattern}" );

const r = new RegExp( path.posix.sep, "g" );

console.log( "C Compiler Macros(-D)" );
console.log();

filterBy( cCompilerRecipe, /^-D/ )
	.forEach( defined =>
		console.log( defined.replace( /^-D/, "" ) ) );

console.log();

console.log( "C Compiler Search directioneries(-I)" );
console.log();

filterBy( cCompilerRecipe, /^-I/ )
	.forEach( defined =>
		console.log( defined
			.replace( /^-I/, "" )
			.replace( /"/g, "" )
			.replace( r, path.sep ) ) );

console.log();

console.log( "C++ Compiler Macros(-D)" );
console.log();

filterBy( cppCompilerRecipe, /^-D/ )
	.forEach( defined =>
		console.log( defined.replace( /^-D/, "" ) ) );

console.log();

console.log( "C++ Compiler search directioneries(-I)" );
console.log();

filterBy( cppCompilerRecipe, /^-I/ )
	.forEach( defined =>
		console.log( defined
			.replace( /^-I/, "" )
			.replace( /"/g, "" )
			.replace( r, path.sep ) ) );

console.log();

console.log( "Linker script(-T)" );
console.log();

filterBy( linkerRecipe, /^-T/ )
	.forEach( defined =>
		console.log( defined
			.replace( /^-T/, "" )
			.replace( /"/g, "" )
			.replace( r, path.sep ) ) );
console.log();

console.log( "Linker search directories(-L)" );
console.log();

filterBy( linkerRecipe, /^-L/ )
	.forEach( defined =>
		console.log( defined
			.replace( /^-L/, "" )
			.replace( /"/g, "" )
			.replace( r, path.sep ) ) );

console.log();
console.log( "Assemblier search directories(-I)" );
console.log();

filterBy( assemblierRecipe, /^-I/ )
	.forEach( defined =>
		console.log( defined
			.replace( /^-I/, "" )
			.replace( /"/g, "" )
			.replace( r, path.sep ) ) );

console.log();

console.log( "C Compiler Recipe" );
console.log();
console.log( cCompilerRecipe );
console.log();

console.log( "C++ Compiler Recipe" );
console.log();
console.log( cppCompilerRecipe );
console.log();

console.log( "Assemblier Recipe" );
console.log();
console.log( assemblierRecipe );
console.log();

console.log( "Linker Recipe" );
console.log();
console.log( linkerRecipe );
console.log();
