import hapiAuthJWT from './lib/';
import JWT from 'jsonwebtoken';
import config from '../config';
const people = {
	1: {
		id: 1,
		name: 'Anthony Valid User'
	}
};

// use the token as the 'authorization' header in requests
// const token = JWT.sign(people[1], config.auth.secret); // synchronous
function makeToken (entity) {
	return JWT.sign(entity, config.auth.secret); // synchronous
}
// bring your own validation function
const validate = async function (decoded, request, h) {
//   console.log(" - - - - - - - decoded token:");
//   console.log(decoded);
//   console.log(" - - - - - - - request info:");
//   console.log(request.info);
//   console.log(" - - - - - - - user agent:");
//   console.log(request.headers['user-agent']);

	// do your checks to see if the person is valid
	if (!people[decoded.id]) {
		return { isValid: false };
	} else {
		return { isValid: true };
	}
};
const cookieOptions = {
	ttl: config.auth.ttl,
	encoding: config.auth.encoding, // we already used JWT to encode
	isSecure: config.auth.isSecure, // warm & fuzzy feelings
	isHttpOnly: config.auth.isHttpOnly, // prevent client alteration
	clearInvalid: config.auth.clearInvalid, // remove invalid cookies
	strictHeader: config.auth.strictHeader // don't allow violations of RFC 6265
};
export {
	hapiAuthJWT,
	validate,
	makeToken,
	cookieOptions
};
