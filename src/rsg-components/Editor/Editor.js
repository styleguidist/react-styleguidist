import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import { polyfill } from 'react-lifecycles-compat';
import SimpleEditor from 'react-simple-code-editor';
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { space } from '../../styles/theme';

const highlight = code => Prism.highlight(code, Prism.languages.jsx, 'jsx');

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
// eslint-disable-next-line import/no-unresolved
require('!!../../../loaders/style-loader!../../../loaders/css-loader!rsg-prism-theme.css');

const styles = ({ fontFamily, fontSize, color }) => ({
	root: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		background: color.codeBackground,
		'& textarea:focus': {
			// TODO: Make focus outline
			outline: 0,
		},
	},
});

export class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired,
	};

	state = { code: this.props.code, prevCode: this.props.code };

	static getDerivedStateFromProps(nextProps, prevState) {
		const { code } = nextProps;
		if (prevState.prevCode !== code) {
			return {
				prevCode: code,
				code,
			};
		}
		return null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.code !== this.state.code;
	}

	handleChange = code => {
		this.setState({ code });
		this.props.onChange(code);
	};

	render() {
		return (
			<SimpleEditor
				className={this.props.classes.root}
				value={this.state.code}
				onValueChange={this.handleChange}
				highlight={highlight}
				// Padding should be passed via a prop (not CSS) for a proper
				// cursor position calculation
				padding={space[2]}
			/>
		);
	}
}

export default Styled(styles)(polyfill(Editor));
