import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import s from './style.css';

export default class Input extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		type: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		before: PropTypes.node,
		after: PropTypes.node,
		allowClear: PropTypes.bool,
		onPressEnter: PropTypes.func,
		onChange: PropTypes.func,
		fucusHandler: PropTypes.func,
		size: PropTypes.oneOf(['small', 'default', 'large']),
		searchHandler: PropTypes.func,
		placeholder: PropTypes.string,
		showIcon: PropTypes.bool
	};

	static defaultProps = {
		className: '',
		vaule: '',
		type: 'text',
		allowClear: false,
		onChange () {},
		fucusHandler () {},
		searchHandler () {},
		size: 'default',
		placeholder: '搜索',
		showIcon: true
	};
	render () {
		const {className, type, onChange, searchHandler, value, fucusHandler, placeholder, size, showIcon} = this.props;
		return (
			<div className={ cn(className, s.input) }>
				<div className={ s.asideSearch }>
					<div className={ s.searchBar }>
						<div className={ s.comSearch }>
							<
								input type={ type }
								placeholder= { placeholder }
								value={ value }
								className={ cn(s.searchInput, s[size]) }
								onChange={ onChange }
								maxLength="20"
								onFocus={ fucusHandler }
							/>
							{
								showIcon && <button type="button" className={ s.searchBtn } onClick={ searchHandler }> 搜索</button>
							}

						</div>
					</div>
				</div>
			</div>);
	}
}
