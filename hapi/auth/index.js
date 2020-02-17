import hapiAuthJWT from './lib/';
import JWT from 'jsonwebtoken';
import config from '../config';
// use the token as the 'authorization' header in requests
// const token = JWT.sign(people[1], config.auth.secret); // synchronous
function makeToken (entity) {
	return JWT.sign(entity, config.auth.secret); // synchronous
}
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
	makeToken,
	cookieOptions
};
