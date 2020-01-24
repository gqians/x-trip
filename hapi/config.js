export default {
	hapi: {
		port: 8090,
		host: 'localhost'
	},
	auth: {
		secret: 'x 刈刂',
		ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
		encoding: 'none', // we already used JWT to encode
		isSecure: true, // warm & fuzzy feelings
		isHttpOnly: true, // prevent client alteration
		clearInvalid: false, // remove invalid cookies
		strictHeader: true, // don't allow violations of RFC 6265
		ignoreExpiration: true,
	}
}
