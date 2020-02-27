// import cn from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';

const HocComponent = (ParameterComponent) =>

	class loadingComponent extends React.Component {
		// constructor (props) {
		// 	super(props);
		// }
		static propTypes = {
			className: PropTypes.string,
			client: PropTypes.shape({
				mutate: PropTypes.func
			}),
			history: PropTypes.shape({
				push: PropTypes.func
			}),
			data: PropTypes.object
		};
		state = {
			loading: true,
			error: false
		};
		componentDidMount () {
			console.log('进入高阶组件');
			const {data} = this.props;
			if (data.error) {
				this.setState({error: true});
			}
			if (!data.loading && !data.error) {
				this.setState({loading: false});
				console.log('加载完毕');
			}
		}
		componentDidUpdate () {
			console.log('loading-进入更新');
			const {data} = this.props;
			if (!this.state.loading) {
				return;
			}
			if (data.error) {
				this.setState({error: true});
			}
			if (!data.loading && !data.error) {
				this.setState({loading: false});
				console.log('加载完毕');
			}
		}
		render () {
			const {loading} = this.state;
			console.log('loading-进入reder');
			return (
				<div className={ s.loading }>
					{(loading) ? <div>now is Loading...</div> : <ParameterComponent { ...this.state } { ...this.props }/>}
				</div>
			);
		}
	};
export default HocComponent;
