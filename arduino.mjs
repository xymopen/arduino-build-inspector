/**
 * @see [Arduino IDE 1.5 3rd party Hardware specification](
 * https://github.com/arduino/Arduino/wiki/Arduino-IDE-1.5-3rd-party-Hardware-specification
 * "Arduino IDE 1.5 3rd party Hardware specification Ã‚Â· arduino/Arduino Wiki")
 */

"break jsdoc";

import * as path from "path";
import { fold, unfold } from "./fold.mjs";

/**
 * @param {string} pathname
 */
export const interpretPath = pathname => {
	/*
	 * Arduino Hardware package hierarchy
	 *
	 * [vendor] {
	 * 	hardware {
	 * 		[arch] {
	 * 			[version] {
	 * 				cores {
	 * 					[core] {
	 *
	 * 					}
	 * 				}
	 * 				variants {
	 * 					[variant]
	 * 				}
	 * 				libraries? {
	 *
	 * 				}
	 * 				boards.local.txt?
	 * 				boards.txt
	 * 				keywords.txt?
	 * 				platform.local.txt?
	 * 				platform.txt
	 * 				programmers.txt?
	 * 			}
	 * 		}
	 * 	}
	 * 	tools {
	 * 		[tool] {
	 * 			[version] {
	 *
	 * 			}
	 * 		}
	 * 	}
	 * }
	 */

	const filenames = path.resolve( pathname ).split( path.sep ),
		hardwareIdx = filenames.indexOf( "hardware" );

	if ( hardwareIdx >= 1 &&
		filenames.length > hardwareIdx + 2 ) {
		return {
			hardware: filenames.slice( 0, hardwareIdx - 1 ).join( path.sep ),
			platform: filenames.slice( 0, hardwareIdx + 3 ).join( path.sep ),
			vendor: filenames[ hardwareIdx - 1 ],
			arch: filenames[ hardwareIdx + 1 ],
			version: filenames[ hardwareIdx + 2 ]
		}
	} else {
		throw new TypeError( "Not a valid path to an Arduino platform" )
	}
};

/** @param {string} path */
export const splitKey = path =>
	path
		.split( "." )
		.map( part => {
			const index = Number( part );

			return Number.isNaN( index ) ? part : index;
		} );

/** @param {string} text */
export const parseDefined = text =>
	fold( text
		.split( /(?:\r\n?|\n)/g )
		.filter( e => e !== "" && !( /^#/ ).test( e ) )
		.map( line => {
			const index = line.indexOf( "=" ),
				path = line.slice( 0, index ).trim(),
				value = line.slice( index + 1 ).trim();

			return [ splitKey( path ), value ];
		} ) );

/** @param {object[]} defineds */
export const mergeDefineds = ( ...defineds ) => fold(
	defineds
		.map( defined => Array.from( unfold( defined ) ) )
		.reduce( ( left, right ) => left.concat( right ) )
);
