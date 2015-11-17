import { Component } from 'react';
import Layout from 'react-styleguidist/components/Layout';

export default class StyleGuide extends Component {
	render() {
		return (
			<Layout {...this.props}/>
		);
	}
}
