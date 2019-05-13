/**
 * @template T
 * @param {T} object
 * @param {keyof T} key
 * @returns {boolean}
 */
export const hasKey = ( object, key ) => Object.prototype.hasOwnProperty.call( object, key );

/**
 * @param {any} value
 * @returns {value is object}
 */
export const isObject = value => typeof value === "object" && null !== value;

const visit = ( object, path ) => {
	let parent = object, i = 0;

	for ( const l = path.length - 1; i < l; i += 1 ) {
		const key = path[ i ];

		if ( isObject( parent[ key ] ) ) {
			parent = parent[ key ];
		} else {
			throw new Error( "No such value" );
		}
	}

	const key = path[ i ];

	return [ parent, key ];
}

/**
 * @param {any} object
 * @param {PropertyKey[]} path
 */
export const visitValue = ( object, path ) => {
	const [ parent, key ] = visit( object, path );

	if ( isObject( parent[ key ] ) ) {
		return parent[ key ]._default;
	} else if ( hasKey( parent, key ) ) {
		return parent[ key ];
	} else {
		throw new Error( "No such value" );
	}
};

/**
 * @param {any} object
 * @param {PropertyKey[]} path
 */
export const visitConfig = ( object, path ) => {
	const [ parent, key ] = visit( object, path );

	if ( isObject( parent[ key ] ) ) {
		return parent[ key ];
	} else {
		throw new Error( "No such config" );
	}
};


/**
 * @param {string} templ
 * @param {(name: string) => string | undefined} replace
 */
export const format = ( templ, replace ) => templ.replace( /\{[^}]+\}/g, $0 => {
	const value = replace( $0.slice( 1, -1 ) );

	return typeof value === "string" ? format( value, replace ) : $0;
} );
