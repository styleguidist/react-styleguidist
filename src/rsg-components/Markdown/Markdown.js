import { Component, PropTypes } from 'react';
import MDReactComponent from 'markdown-react-js';

import s from './Markdown.css';

const headingRegExp = /^h(\d)$/;

function handleIterate(Tag, props, children) {
	// Increase the level of headings
	let m = Tag.match(headingRegExp);
	if (m) {
		Tag = 'h' + (Number(m[1]) + 2);
	}

	// Add class name with tag name to all tags: <span class="span"/>
	if (!props.className) {
		props.className = s[Tag];
	}

	return <Tag {...props}>{children}</Tag>;
}

export default class Markdown extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired
	}

	render() {
		return (
			<MDReactComponent
				text={this.props.text}
				className={s.root}
				onIterate={handleIterate}
			/>
		);
	}
}
