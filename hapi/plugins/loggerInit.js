import bunyan from 'bunyan';

const loggerPlugin = {
    name: 'loggerInit',
	version: '1.0.0',
	register: async function (server, options) {
		const logger = bunyan.createLogger({
			name: options.logger.name,
			serializers: {
			  req: bunyan.stdSerializers.req,
			  res: bunyan.stdSerializers.res,
			  err: bunyan.stdSerializers.err
			},
			streams: [
			  {
				// stream: process.stdout
				type: 'rotating-file',
				level: 'info',
				path: options.logger.path,
				period: options.logger.period,   // daily rotation
				count: options.logger.count        // keep 7 back copies
			  },
			  {
				type: 'rotating-file',
				level: 'debug',
				path: options.logger.path,
				period: options.logger.period,   // daily rotation
				count: options.logger.count       // keep 7 back copies
			  },
			  {
				type: 'rotating-file',
				level: 'error',
				path: options.logger.path,
				period: options.logger.period,   // daily rotation
				count: options.logger.count        // keep 7 back copies
			  }
			]
		});
		server.app.logger=logger;
	}
};

export default loggerPlugin;
