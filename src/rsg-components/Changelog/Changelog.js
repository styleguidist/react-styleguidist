/* eslint
  react/jsx-filename-extension: off
*/
import React, { PropTypes, Component } from 'react';
import ChangelogRenderer from './ChangelogRenderer';

export default class Changelog extends Component {
	static propTypes = {
		text: PropTypes.string,
	};

	getLastVersion = () => {
		const { text } = this.props;
		const regexp = /\(([\w\\. ,_]*)\)/g;
		try {
			const match = regexp.exec(text);
			return match[1];
		}
		catch (e) {
			return null;
		}
	};

	render() {
		const { text } = this.props;
		return (
			<ChangelogRenderer text={text} lastUpdate={this.getLastVersion()} />
 	);
	}
}
