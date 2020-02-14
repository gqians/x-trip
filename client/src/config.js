export default {
	theme: {
		'--color-h': 203,
		'--color-s': 83,
		'--color-l': 63,
		'--color-s-step': 0,
		'--color-l-step': 8,
		'--color-0':
				'hsl(var(--color-h), calc(calc(var(--color-s) - calc(var(--color-s-step) * 1)) * 1%), calc(calc(var(--color-l) - calc(var(--color-l-step) * 1)) * 1%))',
		'--color-1':
				'hsl(var(--color-h), calc(calc(var(--color-s) + calc(var(--color-s-step) * 4)) * 1%), calc(calc(var(--color-l) + calc(var(--color-l-step) * 4)) * 1%))',
		'--color-2':
				'hsl(var(--color-h), calc(calc(var(--color-s) + calc(var(--color-s-step) * 3)) * 1%), calc(calc(var(--color-l) + calc(var(--color-l-step) * 3)) * 1%))',
		'--color-3':
				'hsl(var(--color-h), calc(calc(var(--color-s) + calc(var(--color-s-step) * 2)) * 1%), calc(calc(var(--color-l) + calc(var(--color-l-step) * 2)) * 1%))',
		'--color-4':
				'hsl(var(--color-h), calc(calc(var(--color-s) + calc(var(--color-s-step) * 1)) * 1%), calc(calc(var(--color-l) + calc(var(--color-l-step) * 1)) * 1%))',
		'--color-5':
				'hsl(var(--color-h), calc(var(--color-s) * 1%), calc(calc(var(--color-l)) * 1%))',
		'--color-6':
				'hsl(var(--color-h), calc(calc(var(--color-s) - calc(var(--color-s-step) * 1)) * 1%), calc(calc(var(--color-l) - calc(var(--color-l-step) * 1)) * 1%))',
		'--color-7':
				'hsl(var(--color-h), calc(calc(var(--color-s) - calc(var(--color-s-step) * 2)) * 1%), calc(calc(var(--color-l) - calc(var(--color-l-step) * 2)) * 1%))',
		'--color-8':
				'hsl(var(--color-h), calc(calc(var(--color-s) - calc(var(--color-s-step) * 3)) * 1%), calc(calc(var(--color-l) - calc(var(--color-l-step) * 3)) * 1%))',
		'--color-9':
				'hsl(var(--color-h), calc(calc(var(--color-s) - calc(var(--color-s-step) * 4)) * 1%), calc(calc(var(--color-l) - calc(var(--color-l-step) * 4)) * 1%))',
		'--color-primary': 'var(--color-5, #4da1c0)',

		/* background colour */
		'--color-bg-h': 'var(--color-h)',
		'--color-bg-s': 25,
		'--color-bg-l': 12,
		'--color-bg-s-step': 0,
		'--color-bg-l-step': 8,
		'--color-bg-0':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 1)) * 1%), calc(calc(var(--color-bg-l) - calc(var(--color-bg-l-step) * 1)) * 1%))',
		'--color-bg-1':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 0)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 0)) * 1%))',
		'--color-bg-2':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 1)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 1)) * 1%))',
		'--color-bg-3':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 2)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 2)) * 1%))',
		'--color-bg-4':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 3)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 3)) * 1%))',
		'--color-bg-5':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 4)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 4)) * 1%))',
		'--color-bg-6':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 5)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 5)) * 1%))',
		'--color-bg-7':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 6)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 6)) * 1%))',
		'--color-bg-8':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 7)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 7)) * 1%))',
		'--color-bg-9':
				'hsl(var(--color-bg-h), calc(calc(var(--color-bg-s) + calc(var(--color-bg-s-step) * 8)) * 1%), calc(calc(var(--color-bg-l) + calc(var(--color-bg-l-step) * 8)) * 1%))',
		'--color-bg-10':
				'hsl(var(--color-bg-h), 5%,89% )',
		'--color-bg': 'var(--color-bg-10)',

		/* nav */
		'--color-nav-bg-h': 'var(--color-bg-h)',
		'--color-nav-bg-s': 'calc(var(--color-bg-s) + var(--color-bg-s-step))',
		'--color-nav-bg-l': 'calc(var(--color-bg-l) + var(--color-bg-l-step))',
		'--color-nav-bg-s-step': 0,
		'--color-nav-bg-l-step': 4,
		'--color-nav-bg':
				'hsl(var(--color-nav-bg-h), calc(calc(var(--color-nav-bg-s) + calc(var(--color-nav-bg-s-step) * 0)) * 1%), calc(calc(var(--color-nav-bg-l) + calc(var(--color-nav-bg-l-step) * 0)) * 1%))',
		'--color-nav-border':
				'hsl(var(--color-nav-bg-h), calc(calc(var(--color-nav-bg-s) + calc(var(--color-nav-bg-s-step) * 1)) * 1%), calc(calc(var(--color-nav-bg-l) + calc(var(--color-nav-bg-l-step) * 1)) * 1%))',
		'--color-nav-bg-active':
				'hsl(var(--color-nav-bg-h), calc(calc(var(--color-nav-bg-s) + calc(var(--color-nav-bg-s-step) * 2)) * 1%), calc(calc(var(--color-nav-bg-l) + calc(var(--color-nav-bg-l-step) * 2)) * 1%))',
		'--color-nav-bg-hover':
				'hsl(var(--color-nav-bg-h), calc(calc(var(--color-nav-bg-s) + calc(var(--color-nav-bg-s-step) * 3)) * 1%), calc(calc(var(--color-nav-bg-l) + calc(var(--color-nav-bg-l-step) * 3)) * 1%))',

		/* nav text */
		'--color-nav-text-h': 'var(--color-text-h)',
		'--color-nav-text-s': 'var(--color-text-s)',
		'--color-nav-text-l': 'var(--color-text-l)',
		'--color-nav-text-s-step': 0,
		'--color-nav-text-l-step': 'var(--color-text-step)',
		'--color-nav-text':
				'hsl(var(--color-nav-text-h), calc(calc(var(--color-nav-text-s) + calc(var(--color-nav-text-s-step) * 3)) * 1%), calc(calc(var(--color-nav-text-l) + calc(var(--color-nav-text-l-step) * 3)) * 1%))',
		'--color-nav-text-active':
				'hsl(var(--color-nav-text-h), calc(calc(var(--color-nav-text-s) + calc(var(--color-nav-text-s-step) * 0)) * 1%), calc(calc(var(--color-nav-text-l) + calc(var(--color-nav-text-l-step) * 0)) * 1%))',

		/* box colour hsl(213, 64%, 78%) */
		'--box-bg-h': 'calc(var(--color-h) + 10)',
		'--box-bg-s': 64,
		'--box-bg-l': 78,
		'--color-box-bg':
				'hsla(var(--box-bg-h), calc((var(--box-bg-s) * 1%)), calc(var(--box-bg-l) * 1%), 0.1)',

		/* shaodw */
		'--shadow-1': '0 2px 2px -1px hsla(var(--color-h), 0, 0, 0.15)',
		'--shadow-2': '0 3px 3px -1px hsla(var(--color-h), 0, 0, 0.2)',
		'--shadow-3': '0 4px 4px -1px hsla(var(--color-h), 0, 0, 0.25)',

		/** border colour */
		'--color-border-s': 15,
		'--color-border-s-step': -4,
		'--color-border-l': 44,
		'--color-border-l-step': -2,
		'--color-border-0':
				'hsl(var(--color-h), calc(calc(var(--color-border-s) + calc(var(--color-border-s-step) * 0)) * 1%), calc(calc(var(--color-border-l) + calc(var(--color-border-l-step) * 0)) * 1%))',
		'--color-border-1':
				'hsl(var(--color-h), calc(calc(var(--color-border-s) + calc(var(--color-border-s-step) * 1)) * 1%), calc(calc(var(--color-border-l) + calc(var(--color-border-l-step) * 4)) * 1%))',
		'--color-border-2':
				'hsl(var(--color-h), calc(calc(var(--color-border-s) + calc(var(--color-border-s-step) * 2)) * 1%), calc(calc(var(--color-border-l) + calc(var(--color-border-l-step) * 6)) * 1%))',
		'--color-border-3':
				'hsl(var(--color-h), calc(calc(var(--color-border-s) + calc(var(--color-border-s-step) * 3)) * 1%), calc(calc(var(--color-border-l) + calc(var(--color-border-l-step) * 7)) * 1%))',
		'--color-border': 'var(--color-border-1)',

		/** alert colour */
		'--color-error':
				'hsl(10, calc(var(--color-s) * 1%), calc(var(--color-l) * 1%))',
		'--color-warning':
				'hsl(30, calc(var(--color-s) * 1%), calc(var(--color-l) * 1%))',
		'--color-success':
				'hsl(80, calc(var(--color-s) * 1%), calc(var(--color-l) * 1%))',

		/** text color */
		'--color-text-h': 'var(--color-h)',
		'--color-text-s': 0,
		'--color-text-l': 10,
		'--color-text-step': -10,
		'--color-text-0':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l)) * 1%))',
		'--color-text-1':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 1)) * 1%))',
		'--color-text-2':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 2)) * 1%))',
		'--color-text-3':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 3)) * 1%))',
		'--color-text-4':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 4)) * 1%))',
		'--color-text-5':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 5)) * 1%))',
		'--color-text-6':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 6)) * 1%))',
		'--color-text-7':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 7)) * 1%))',
		'--color-text-8':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 8)) * 1%))',
		'--color-text-9':
				'hsl(var(--color-text-h), calc(var(--color-text-s) * 1%), calc(calc(var(--color-text-l) + calc(var(--color-text-step) * 9)) * 1%))',
		'--color-text': 'var(--color-text-1)',
		'--color-text-primary': 'var(--color-text-1)',
		'--color-text-secondary': 'var(--color-text-2)',
		'--color-text-tertiary': 'var(--color-text-3)',

		/**
			 * font
			 */
		'--font-primary': `'PingFang SC', 'Source Han SC', 'Noto Sans SC',
				'Hiragino Sans GB', 'Microsoft YaHei', 'Avenir Next', 'Helvetica Neue',
				Helvetica, sans-serif`,
		'--font-secondary': 'serif',
		'--font-tabular': '\'Menlo, Consolas, \'Dejavu Sans Mono\', monospace',

		'--text-base-size': '14px',
		'--text-xs': 'calc(var(--text-base-size) - 4px)' /* 10px */,
		'--text-sm': 'calc(var(--text-base-size) - 2px)' /* 12px */,
		'--text-md': 'var(--text-base-size)' /* 14px */,
		'--text-lg': 'calc(var(--text-base-size) + 2px)' /* 16px */,
		'--text-xl': 'calc(var(--text-base-size) + 6px)' /* 20px */,
		'--text-xxl': 'calc(var(--text-base-size) + 10px)' /* 24px */,
		'--text-xxxl': 'calc(var(--text-base-size) + 18px)' /* 32px */
	}
};
